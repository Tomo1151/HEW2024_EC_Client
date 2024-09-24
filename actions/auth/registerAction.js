"use server";

import { redirect } from "next/navigation";

export default async function register(state, formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    return { message: "空の項目があります" };
  }

  redirect("/");
}
