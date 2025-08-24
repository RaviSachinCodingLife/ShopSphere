"use client";
import { useAppDispatch } from "@/store";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Topbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);


    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const user = JSON.parse(stored);
            setUsername(user.username || "Guest");
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

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
                <div style={{ marginLeft: "auto" }}>
                    {username ? (
                        <>
                            <span style={{ marginRight: "15px" }}>Hi, {username}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link href="/auth/login">Login</Link>
                    )}
                </div>
                <Link href="/settings">⚙️ Settings</Link>
            </div>
        </header>
    );
}
