import { ReactNode } from "react";

type DashboardData = {
  dashboardKPIs: {
    totalSales: number;
    ordersInProgress: number;
    activeUsers: number;
  };
  salesAnalytics: {
    revenueTrend: { date: string; value: number }[];
  };
};

interface ProvidersProps {
  children: ReactNode;
}

export type { DashboardData, ProvidersProps };
