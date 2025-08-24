type SalesData = {
  salesAnalytics: {
    revenueTrend: { date: string; value: number }[];
    topProducts: { id: string; name: string; units: number; revenue: number }[];
  };
};

type SalesVars = {
  range: string;
  groupBy: string;
  category?: string | null;
  region?: string | null;
};

export type { SalesData, SalesVars };
