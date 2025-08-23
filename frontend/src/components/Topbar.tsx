"use client";
import { useAppDispatch } from "@/store";
import { toggleSidebar } from "@/store/slices/uiSlice";

export default function Topbar() {
    const dispatch = useAppDispatch();
    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="md:hidden rounded-xl border px-3 py-2"
                >
                    Menu
                </button>
                <div className="font-medium">E-Commerce Analytics</div>
                <div className="text-sm text-slate-600">Admin</div>
            </div>
        </header>
    );
}
