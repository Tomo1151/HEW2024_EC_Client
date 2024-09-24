"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// import loginAction from "@/actions/auth/loginAction";
import SubmitButton from "@/components/SubmitButton";
import TextInput from "@/components/TextInput";
import { useEffect } from "react";

import { useAuthContext } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const { activeUser, login } = useAuthContext();

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
    <>
      <h1 className="text-3xl font-bold text-center">ログイン</h1>
      <form>
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
          placeholder="パスワード"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {status && <p className="text-center text-red-600">{status}</p>}
        <SubmitButton text="ログイン" onSubmit={handleSubmit} />
      </form>
    </>
  );
};

export default Login;
