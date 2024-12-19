"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUserContext } from "@/context/UserContext";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("　");

  const { signin } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await signin(username, email, password);

    if (!data.success) {
      setStatus(data.message);
      return;
    }

    router.replace("/login");
  }

  return (
    <RegisterForm
      status={status}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
