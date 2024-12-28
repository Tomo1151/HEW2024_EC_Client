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
  const [isFetching, setIsFetching] = useState(false);

  const { signin } = useUserContext();

  async function handleSubmit(event) {
    setIsFetching(true);
    event.preventDefault();
    const data = await signin(username, email, password);

    if (!data.success) {
      setStatus(data.message);
      setIsFetching(false);
      return;
    }

    router.replace("/login", { scroll: false });
  }

  return (
    <Modal redirectPath="/">
      <RegisterForm
        status={status}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        isFetching={isFetching}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default InterceptRegister;
