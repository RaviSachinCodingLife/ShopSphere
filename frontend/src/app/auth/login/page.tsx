"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { loading, error }] = useMutation(LOGIN);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { email, password } });
            if (data?.login) {
                localStorage.setItem("token", data.login.token);
                localStorage.setItem("user", JSON.stringify(data.login.user));
                router.push("/sales");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };


    return (
        <div style={{ maxWidth: 400, margin: "80px auto" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ display: "block", marginBottom: 10, width: "100%" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ display: "block", marginBottom: 10, width: "100%" }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p style={{ color: "red" }}>{error.message}</p>}
            </form>
            <p>
                Don’t have an account? <Link href="/auth//register">Register</Link>
            </p>
        </div>
    );
}
