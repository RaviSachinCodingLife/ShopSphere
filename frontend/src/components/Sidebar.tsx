"use client";
import { BarChart3, Package, Users, Activity, Truck } from "lucide-react";
import Link from "next/link";

const items = [
    { href: "/", label: "Dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { href: "/sales", label: "Sales", icon: <Activity className="h-5 w-5" /> },
    { href: "/inventory", label: "Inventory", icon: <Package className="h-5 w-5" /> },
    { href: "/users", label: "Users", icon: <Users className="h-5 w-5" /> },
    { href: "/orders", label: "Orders", icon: <Truck className="h-5 w-5" /> },
];

export default function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r bg-white/90 backdrop-blur shadow-soft">
            <div className="px-6 py-5 font-semibold text-xl">ShopSphere</div>
            <nav className="px-2 space-y-1">
                {items.map((it) => (
                    <Link
                        key={it.href}
                        href={it.href}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
                    >
                        {it.icon}<span>{it.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto p-4 text-xs text-slate-500">v1.0</div>
        </aside>
    );
}
