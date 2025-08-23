"use client";
import { useQuery } from "@apollo/client/react"
import { USERS } from "@/graphql/queries";
import KpiCard from "@/components/KpiCard";
import LineAreaChart from "@/components/LineAreaChart";

export default function Users() {
    const { data, loading, error } = useQuery(USERS, { variables: { range: "last_30" } });
    if (loading) return <div>Loading…</div>;
    if (error) return <pre className="text-red-600">{String(error)}</pre>;
    const u = data.userBehavior;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">User Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard title="Active Users" value={u.activeUsers} />
                <KpiCard title="New Users" value={u.newUsers} />
                <KpiCard title="Returning Users" value={u.returningUsers} />
                <KpiCard title="Avg Session (min)" value={u.avgSessionMins} />
            </div>
            <div>
                <div className="text-sm text-slate-500 mb-2">Conversion Funnel (relative)</div>
                <LineAreaChart data={u.funnel} xKey="date" dataKey="value" />
            </div>
        </div>
    );
}
