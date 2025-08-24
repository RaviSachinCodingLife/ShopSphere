"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { LoginUser, LoginVariables } from "@/app/auth/login/type";

export function useLogin() {
  const router = useRouter();
  const [form, setForm] = useState<LoginVariables>({ email: "", password: "" });
  const [login, { loading, error }] = useMutation<LoginUser, LoginVariables>(
    LOGIN
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: form });
      console.log({ data });

      if (data?.login) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("user", JSON.stringify(data.login.user));
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const inputs = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  return {
    form,
    handleChange,
    inputs,
    handleLogin,
    loading,
    error,
  };
}
