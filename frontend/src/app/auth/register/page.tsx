"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, { loading, error }] = useMutation(REGISTER);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await register({
                variables: { username, email, password },
            });
            if (data?.register) {
                localStorage.setItem("token", data.register.token);
                localStorage.setItem("user", JSON.stringify(data.register.user));
                router.push("/sales");
            }
        } catch (err) {
            console.error("Register failed:", err);
        }
    };


    return (
        <div style={{ maxWidth: 400, margin: "80px auto" }}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    style={{ display: "block", marginBottom: 10, width: "100%" }}
                />
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
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && <p style={{ color: "red" }}>{error.message}</p>}
            </form>
            <p>
                Already have an account? <Link href="/">Login</Link>
            </p>
        </div>
    );
}
