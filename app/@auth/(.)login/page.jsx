"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import SubmitButton from "@/components/SubmitButton";

import { useAuthContext } from "@/context/AuthContext";

const LoginModal = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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
      <h1 className="text-center text-2xl">ログイン</h1>
      <form>
        <TextInput
          type="email"
          name="email"
          placeholder="メールアドレス"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="パスワード"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="ログイン" onSubmit={handleSubmit} />
      </form>
    </Modal>
  );
};

export default LoginModal;
