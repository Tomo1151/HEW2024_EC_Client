"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";
import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";

export default async function loginAction(_, formData) {
  const { login } = useAuthContext();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email && !password) {
    return { message: "メールアドレスとパスワードを入力してください" };
  } else if (!email) {
    return { message: "メールアドレスを入力してください" };
  } else if (!password) {
    return { message: "パスワードを入力してください" };
  }

  await login(email, password);
  // cookies().set("access_token", response.headers.get("set-cookie"));
  redirect("/");
}
