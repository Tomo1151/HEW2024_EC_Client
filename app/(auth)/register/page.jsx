"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SubmitButton from "@/components/SubmitButton";
import TextInput from "@/components/TextInput";

import { useAuthContext } from "@/context/AuthContext";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const { signin } = useAuthContext();

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
