type OrdersData = {
  orders: {
    edges: {
      node: {
        id: string;
        total: number;
        status: string;
        customer: string;
        createdAt: string;
      };
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
};

type OrdersVars = {
  first: number;
  after?: string | null;
  status?: string;
};

export type { OrdersData, OrdersVars };
