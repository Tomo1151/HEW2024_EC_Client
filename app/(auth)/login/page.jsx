"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/LoginForm";

import { useAuthContext } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(" ");

  const { login } = useAuthContext();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await login(email, password);

    if (!data.success) {
      setStatus(data.message);
      return;
    }

    router.replace("/");
  }

  return (
    <LoginForm
      status={status}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
