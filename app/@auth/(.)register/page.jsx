"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import SubmitButton from "@/components/SubmitButton";

import { useAuthContext } from "@/context/AuthContext";

const InterceptRegister = () => {
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

    router.replace("/login", { scroll: false });
  }

  return (
    <Modal>
      <h1 className="text-center text-2xl">新規登録</h1>
      <form>
        <TextInput
          type="username"
          name="username"
          placeholder="ユーザー名"
          autoComplete="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
          autoComplete="new-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="パスワード"
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="新規登録" onSubmit={handleSubmit} />
      </form>
    </Modal>
  );
};

export default InterceptRegister;
