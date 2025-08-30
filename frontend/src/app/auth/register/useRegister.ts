"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { RegisterUser, RegisterVariables } from "./type";

export function useRegister() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterVariables>({
    username: "",
    email: "",
    password: "",
  });

  const [register, { loading, error }] = useMutation<
    RegisterUser,
    RegisterVariables
  >(REGISTER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: form });
      console.log({ data });

      if (data?.register) {
        localStorage.setItem("token", data.register.token);
        localStorage.setItem("user", JSON.stringify(data.register.user));
        router.push("/");
      }
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  const inputs: {
    label: string;
    name: keyof RegisterVariables;
    type: string;
  }[] = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  return {
    form,
    handleChange,
    inputs,
    handleRegister,
    loading,
    error,
  };
}
