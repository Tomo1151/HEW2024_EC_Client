"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";

import { useAuthContext } from "@/context/AuthContext";

const LoginModal = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("　");

  const { login } = useAuthContext();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await login(email, password);

    if (!data.success) {
      setStatus(data.message);
      return;
    }

    router.push("/", { scroll: false });
  }

  return (
    <Modal>
      <LoginForm
        status={status}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default LoginModal;
