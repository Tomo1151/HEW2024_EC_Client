"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import RegisterForm from "@/components/RegisterForm";

import { useUserContext } from "@/context/UserContext";

const InterceptRegister = () => {
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

    router.replace("/login", { scroll: false });
  }

  return (
    <Modal>
      <RegisterForm
        status={status}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default InterceptRegister;
