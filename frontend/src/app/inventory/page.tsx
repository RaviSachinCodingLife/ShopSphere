"use client";
import { useQuery } from "@apollo/client/react";
import { INVENTORY } from "@/graphql/queries";
import { useState } from "react";

export default function Inventory() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string | null>(null);
    const pageSize = 12;
    const { data, loading, error, refetch } = useQuery(INVENTORY, { variables: { page, pageSize, status } });

    if (loading) return <div>Loading…</div>;
    if (error) return <pre className="text-red-600">{String(error)}</pre>;

    const inv = data.inventory;
    const totalPages = Math.ceil(inv.total / inv.pageSize);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Inventory</h1>
            <div className="flex gap-2">
                {["ALL", "IN_STOCK", "LOW", "OUT_OF_STOCK"].map(s => (
                    <button key={s}
                        className={`px-3 py-1 rounded-md border ${status === (s === "ALL" ? null : s) ? "bg-blue-600 text-white" : ""}`}
                        onClick={() => { const st = s === "ALL" ? null : s; setStatus(st); setPage(1); refetch({ page: 1, pageSize, status: st }); }}>
                        {s.replace("_", " ")}
                    </button>
                ))}
            </div>

            <div className="rounded-2xl bg-white p-5 shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-500">
                            <th className="py-2">SKU</th><th className="py-2">Name</th><th className="py-2">Stock</th><th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inv.items.map((it: any) => (
                            <tr key={it.id} className="border-t">
                                <td className="py-2">{it.sku}</td>
                                <td className="py-2">{it.name}</td>
                                <td className="py-2">{it.stock}</td>
                                <td className="py-2">{it.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-2">
                <button disabled={page <= 1} className="px-3 py-1 rounded-md border disabled:opacity-50"
                    onClick={() => { setPage(page - 1); refetch({ page: page - 1, pageSize, status }); }}>Prev</button>
                <div className="text-sm text-slate-600">Page {page} / {totalPages}</div>
                <button disabled={page >= totalPages} className="px-3 py-1 rounded-md border disabled:opacity-50"
                    onClick={() => { setPage(page + 1); refetch({ page: page + 1, pageSize, status }); }}>Next</button>
            </div>
        </div>
    );
}
