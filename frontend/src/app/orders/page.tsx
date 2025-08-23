"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ORDERS, UPDATE_ORDER } from "@/graphql/queries";

export default function Orders() {
    const [status, setStatus] = useState<string | undefined>(undefined);
    const { data, loading, error, fetchMore, refetch } = useQuery(ORDERS, { variables: { first: 15, after: null, status } });
    const [updateOrder] = useMutation(UPDATE_ORDER);

    // Poll every 5s to simulate real-time (replace with WebSocket subscription in prod)
    useEffect(() => {
        const id = setInterval(() => refetch({ first: 15, after: null, status }), 5000);
        return () => clearInterval(id);
    }, [refetch, status]);

    if (loading) return <div>Loading…</div>;
    if (error) return <pre className="text-red-600">{String(error)}</pre>;

    const edges = data.orders.edges;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Order Tracking</h1>
                <div className="space-x-2">
                    {["ALL", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
                        <button key={s}
                            className={`px-3 py-1 rounded-md border ${status === (s === "ALL" ? undefined : s) ? "bg-blue-600 text-white" : ""}`}
                            onClick={() => setStatus(s === "ALL" ? undefined : s)}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-500"><th className="py-2">Order</th><th>Total</th><th>Status</th><th>Customer</th><th>Created</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {edges.map((e: any) => (
                            <tr key={e.node.id} className="border-t">
                                <td className="py-2">{e.node.id}</td>
                                <td className="py-2">${e.node.total.toFixed(2)}</td>
                                <td className="py-2">{e.node.status}</td>
                                <td className="py-2">{e.node.customer}</td>
                                <td className="py-2">{new Date(e.node.createdAt).toLocaleString()}</td>
                                <td className="py-2 space-x-2">
                                    {["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].map(st => (
                                        <button key={st} className="px-2 py-1 rounded-md border"
                                            onClick={() => updateOrder({ variables: { id: e.node.id, status: st } }).then(() => refetch({ first: 15, status }))}>
                                            {st}
                                        </button>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.orders.pageInfo.hasNextPage && (
                    <div className="pt-3">
                        <button className="px-3 py-1 rounded-md border"
                            onClick={() => fetchMore({ variables: { after: data.orders.pageInfo.endCursor } })}>
                            Load more
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
