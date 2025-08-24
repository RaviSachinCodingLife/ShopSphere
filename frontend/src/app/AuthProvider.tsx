"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();


    const initialAuth = useMemo(() => {
        if (typeof window !== "undefined") {
            return !!localStorage.getItem("token");
        }
        return false;
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

    const isAuthRoute = pathname.startsWith("/auth");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = !!token;
        setIsAuthenticated(loggedIn);

        if (!loggedIn && !isAuthRoute) {
            router.replace("/auth/login");
        }
        if (loggedIn && isAuthRoute) {
            router.replace("/");
        }
    }, [pathname, isAuthRoute, router]);


    if (isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
