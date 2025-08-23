"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function LineAreaChart({ data }: { data: { date: string; value: number }[] }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="col" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="5%" stopOpacity={0.4} stopColor="#3b82f6" />
                            <stop offset="95%" stopOpacity={0} stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#col)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
