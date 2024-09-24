"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SubmitButton from "@/components/SubmitButton";
import TextInput from "@/components/TextInput";

import { useAuthContext } from "@/context/AuthContext";

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
    <>
      <h1 className="text-3xl font-bold text-center">新規登録</h1>
      <form>
        <TextInput
          type="username"
          name="username"
          placeholder="ユーザー名"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="メールアドレス"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextInput
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="パスワード"
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="新規登録" onSubmit={handleSubmit} />
      </form>
    </>
  );
};

export default Register;
