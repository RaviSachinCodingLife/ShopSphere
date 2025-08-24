"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Package, Users, Activity, Truck } from "lucide-react";

const useTopbar = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
  };

  return { user, logout };
};

export { useTopbar };
