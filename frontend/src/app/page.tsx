"use client";
import { gql, useQuery } from "@apollo/client";
import KpiCard from "@/components/KpiCard";
import LineAreaChart from "@/components/LineAreaChart";

const DASH = gql`
  query Metrics($first:Int!){ salesMetrics{ totalRevenue avgOrderValue conversionRate dailyTrend{date value} } orders(first:$first){ edges{ node{ id status total customer createdAt } } pageInfo{ endCursor hasNextPage } } }
`;

export default function Page() {
  const { data, loading, error } = useQuery(DASH, { variables: { first: 10 } });

  if (loading) return <div className="p-8">Loading dashboard…</div>;
  if (error) return <pre className="p-8 text-red-600">{String(error)}</pre>;

  const metric = data.salesMetrics;
  const trend = metric.dailyTrend;

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">ShopSphere Analytics</h1>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value={`$${metric.totalRevenue.toLocaleString()}`} />
        <KpiCard title="Avg Order" value={`$${metric.avgOrderValue}`} />
        <KpiCard title="Conversion" value={`${metric.conversionRate}%`} />
        <KpiCard title="Active Users" value="—" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><LineAreaChart data={trend} /></div>
        <div className="rounded-2xl bg-white p-5 shadow">Inventory overview component</div>
      </section>
    </main>
  );
}
