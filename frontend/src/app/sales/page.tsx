"use client";
import { useQuery } from "@apollo/client/react";
import { SALES } from "@/graphql/queries";
import LineAreaChart from "@/components/LineAreaChart";

export default function Sales() {
    const { data, loading, error, refetch } = useQuery(SALES, {
        variables: { range: "last_90", groupBy: "DAY", category: null, region: null },
    });

    if (loading) return <div>Loading…</div>;
    if (error) return <pre className="text-red-600">{String(error)}</pre>;

    const s = data.salesAnalytics;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Sales Analytics</h1>
                <div className="space-x-2">
                    <button className="px-3 py-1 rounded-md border" onClick={() => refetch({ range: "last_30", groupBy: "DAY" })}>30D</button>
                    <button className="px-3 py-1 rounded-md border" onClick={() => refetch({ range: "last_90", groupBy: "WEEK" })}>90D</button>
                    <button className="px-3 py-1 rounded-md border" onClick={() => refetch({ range: "last_365", groupBy: "MONTH" })}>1Y</button>
                </div>
            </div>

            <LineAreaChart data={s.revenueTrend} xKey="date" dataKey="value" />

            <div className="rounded-2xl bg-white p-5 shadow">
                <div className="font-semibold mb-3">Top Products</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-slate-500">
                                <th className="py-2">Product</th>
                                <th className="py-2">Units</th>
                                <th className="py-2">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {s.topProducts.map((p: any) => (
                                <tr key={p.id} className="border-t">
                                    <td className="py-2">{p.name}</td>
                                    <td className="py-2">{p.units}</td>
                                    <td className="py-2">${p.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
