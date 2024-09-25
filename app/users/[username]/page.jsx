"use server";

import ProfileContainer from "@/components/ProfileContainer";
import { fetchBaseURL } from "@/config/fetchConfig";

const UserProfile = async (route) => {
  console.log(`GET /users/${route.params.username}`);
  const response = await fetch(
    `${fetchBaseURL}/users/${route.params.username}`,
    { cache: "no-store" }
  );
  const resJson = await response.json();

  if (!resJson.success) {
    return;
  }

  console.log(resJson);

  // const userData = resJson.data;
  // console.log(userData);
  const user = { username: "test", bio: "" };
  return <ProfileContainer user={user} />;
};

export default UserProfile;
