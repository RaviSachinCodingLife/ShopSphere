type InventoryData = {
  inventory: {
    total: number;
    pageSize: number;
    items: {
      id: string;
      sku: string;
      name: string;
      stock: number;
      status: string;
    }[];
  };
};

type InventoryVars = {
  page: number;
  pageSize: number;
  status?: string | null;
};

export type { InventoryData, InventoryVars };
