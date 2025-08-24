import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const customers = [
  "Ava",
  "Liam",
  "Mia",
  "Noah",
  "Zoe",
  "Ivy",
  "Ethan",
  "Mila",
  "Aria",
  "Kai",
];
const statuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

const users = [];

function seedOrders(n = 200) {
  return Array.from({ length: n }).map((_, i) => ({
    id: `ord-${n - i}`,
    status: pick(statuses),
    total: +(20 + Math.random() * 480).toFixed(2),
    customer: pick(customers),
    createdAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 60
    ).toISOString(),
  }));
}

const ORDERS = seedOrders();
const PRODUCTS = Array.from({ length: 80 }).map((_, i) => ({
  id: `sku-${i + 1}`,
  sku: `SKU-${String(i + 1).padStart(4, "0")}`,
  name: `Product ${i + 1}`,
  stock: Math.floor(Math.random() * 200),
}));

function stockStatus(stock) {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock < 10) return "LOW";
  return "IN_STOCK";
}

export const resolvers = {
  Query: {
    hello: () => "🚀 Hello from ShopSphere GraphQL Backend!",
    dashboardKPIs: () => ({
      totalSales: ORDERS.reduce((s, o) => s + o.total, 0),
      ordersInProgress: ORDERS.filter(
        (o) => o.status === "PENDING" || o.status === "SHIPPED"
      ).length,
      activeUsers: 540 + Math.floor(Math.random() * 80),
    }),

    salesAnalytics: (_, { range, groupBy, category, region }) => {
      const groups = { DAY: 30, WEEK: 12, MONTH: 12 }[groupBy] ?? 30;
      const revenueTrend = Array.from({ length: groups }).map((_, i) => {
        const d = new Date();
        if (groupBy === "DAY") d.setDate(d.getDate() - (groups - 1 - i));
        if (groupBy === "WEEK") d.setDate(d.getDate() - 7 * (groups - 1 - i));
        if (groupBy === "MONTH") d.setMonth(d.getMonth() - (groups - 1 - i));
        return {
          date: d.toISOString().slice(0, 10),
          value: Math.round(2000 + Math.random() * 5000),
        };
      });
      const topProducts = PRODUCTS.slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        revenue: +(10000 + Math.random() * 25000).toFixed(2),
        units: 100 + Math.floor(Math.random() * 800),
      }));
      return { range, groupBy, revenueTrend, topProducts };
    },

    inventory: (_, { page, pageSize, status }) => {
      let items = PRODUCTS.map((p) => ({ ...p, status: stockStatus(p.stock) }));
      if (status) items = items.filter((i) => i.status === status);
      const total = items.length;
      const start = (page - 1) * pageSize;
      const slice = items.slice(start, start + pageSize);
      return { items: slice, total, page, pageSize };
    },

    userBehavior: () => {
      const activeUsers = 500 + Math.floor(Math.random() * 300);
      const newUsers = 70 + Math.floor(Math.random() * 100);
      const returningUsers = activeUsers - newUsers;
      const funnel = [
        { date: "views", value: 10000 },
        { date: "product", value: 4200 },
        { date: "cart", value: 1200 },
        { date: "checkout", value: 800 },
        { date: "purchased", value: 280 },
      ];
      return {
        activeUsers,
        newUsers,
        returningUsers,
        avgSessionMins: +(5 + Math.random() * 4).toFixed(1),
        funnel,
      };
    },

    orders: (_, { first, after, status }) => {
      let list = [...ORDERS];
      if (status) list = list.filter((o) => o.status === status);
      const start = after
        ? Math.max(0, list.findIndex((o) => o.id === after) + 1)
        : 0;
      const slice = list.slice(start, start + first);
      const edges = slice.map((o) => ({ node: o, cursor: o.id }));
      return {
        edges,
        pageInfo: {
          endCursor: edges.length ? edges[edges.length - 1].cursor : null,
          hasNextPage: start + first < list.length,
        },
      };
    },

    order: (_, { id }) => ORDERS.find((o) => o.id === id) || null,

    me: (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },

  Mutation: {
    updateOrderStatus: (_, { id, status }, { user }) => {
      if (!user || (user.role !== "ADMIN" && user.role !== "ANALYTICS"))
        throw new Error("Unauthorized");
      const o = ORDERS.find((x) => x.id === id);
      if (!o) throw new Error("Order not found");
      o.status = status;
      return o;
    },

    updatePreference: () => true,

    // ✅ Register new user
    register: async (_, { username, email, password }) => {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashed = await bcrypt.hash(password, 10);
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
        password: hashed,
        role: "analytics",
      };
      users.push(newUser);

      console.log("Users array after register:", users, newUser);

      const token = jwt.sign(
        { userId: newUser.id, role: newUser.role },
        "MY_SECRET",
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      };
    },

    // ✅ Login
    login: async (_, { email, password }) => {
      const user = users.find((u) => u.email === email);
      if (!user) throw new Error("User not found");
      console.log("Trying to login with:", email);
      console.log("Available users:", users);

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        "MY_SECRET",
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    },

    // ✅ Upgrade role
    upgradeRole: (_, { userId, role }) => {
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");

      user.role = role;
      return user;
    },

    // ✅ Analytics/Admin features
    deleteProduct: (_, { id }, { user }) => {
      if (!user || (user.role !== "ADMIN" && user.role !== "ANALYTICS"))
        throw new Error("Unauthorized");
      const index = PRODUCTS.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Product not found");
      PRODUCTS.splice(index, 1);
      return true;
    },

    updateProductStock: (_, { id, stock }, { user }) => {
      if (!user || (user.role !== "ADMIN" && user.role !== "ANALYTICS"))
        throw new Error("Unauthorized");
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      product.stock = stock;
      return { ...product, status: stockStatus(stock) };
    },
  },

  Subscription: {
    orderUpdated: {
      subscribe: () => {
        throw new Error(
          "Subscriptions require WebSocket infra; add API Gateway WS in prod."
        );
      },
    },
  },
};

export default resolvers;
