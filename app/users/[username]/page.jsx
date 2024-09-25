"use server";

import ProfileContainer from "@/components/ProfileContainer";
import { fetchBaseURL } from "@/config/fetchConfig";
import { notFound } from "next/navigation";

const UserProfile = async (route) => {
  console.log(`GET /users/${route.params.username}`);
  const response = await fetch(
    `${fetchBaseURL}/users/${route.params.username}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }
  const resJson = await response.json();

  if (!resJson.success) {
    return;
  }

  const userData = resJson.data;
  console.log(userData);
  return <ProfileContainer user={userData} />;
};

export default UserProfile;
