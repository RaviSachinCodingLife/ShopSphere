"use client";
import { useQuery } from "@apollo/client/react";
import { DASHBOARD } from "@/graphql/queries";
import KpiCard from "@/components/KpiCard";
import LineAreaChart from "@/components/LineAreaChart";

export default function Dashboard() {
  const { data, loading, error } = useQuery(DASHBOARD);
  if (loading) return <div>Loading…</div>;
  if (error) return <pre className="text-red-600">{String(error)}</pre>;

  const k = data.dashboardKPIs;
  const trend = data.salesAnalytics.revenueTrend;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Sales" value={`$${k.totalSales.toLocaleString()}`} hint="last 30 days" />
        <KpiCard title="Orders in Progress" value={k.ordersInProgress} />
        <KpiCard title="Active Users" value={k.activeUsers} />
      </div>
      <div>
        <div className="text-sm text-slate-500 mb-2">Revenue (last 30 days)</div>
        <LineAreaChart data={trend} xKey="date" dataKey="value" />
      </div>
    </div>
  );
}
