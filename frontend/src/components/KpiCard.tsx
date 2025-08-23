export default function KpiCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow">
            <div className="text-slate-500 text-sm">{title}</div>
            <div className="text-2xl font-semibold mt-2">{value}</div>
        </div>
    );
}
