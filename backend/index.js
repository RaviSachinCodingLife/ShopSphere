import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { resolvers } from "./resolvers.js";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load schema
const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf8");

// JWT secret (⚠️ move to .env in prod)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const app = express();
const httpServer = http.createServer(app);

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";
      if (auth.startsWith("Bearer ")) {
        try {
          const token = jwt.sign(
            { userId: newUser.id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "7d" }
          );
          const decoded = jwt.verify(token, JWT_SECRET);
          const { users } = await import("./resolvers.js");
          const user = users.find((u) => u.id === decoded.userId);
          return { user };
        } catch (e) {
          return {};
        }
      }
      return {};
    },
  })
);

app.get("/", (req, res) => {
  res.send("🚀 ShopSphere GraphQL API is running! Use /graphql");
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
