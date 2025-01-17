"use server";

import { cookies, headers } from "next/headers";
import UserProfile from "@/app/(main)/users/[username]/page";

import { fetchHeaders } from "@/config/fetchConfig";
import FollowerList from "@/components/FollowerList";

const UserProfileEditPage = async ({ params }) => {
  const username = params.username;
  const host = headers().get("host");

  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
        Origin: `http://${host}`,
        ...fetchHeaders,
      },
    }
  );

  const userData = await userResponse.json();

  return (
    <>
      <FollowerList userData={userData.data} />
      <UserProfile username={username} />
    </>
  );
};

export default UserProfileEditPage;
