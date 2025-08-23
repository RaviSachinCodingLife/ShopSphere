export default function KpiCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow">
            <div className="text-slate-500 text-sm">{title}</div>
            <div className="text-2xl font-semibold mt-2">{value}</div>
            {hint && <div className="text-xs text-slate-400 mt-1">{hint}</div>}
        </div>
    );
}
