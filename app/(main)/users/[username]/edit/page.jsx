"use server";

import { cookies, headers } from "next/headers";
import UserProfile from "@/app/(main)/users/[username]/page";
import ProfileEditForm from "@/components/ProfileEditForm";

import { fetchHeaders } from "@/config/fetchConfig";
import { redirect } from "next/navigation";

const UserProfileEditPage = async ({ params }) => {
  try {
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
    ).catch((err) => {
      console.log("redirecting...");
      redirect("/");
    });

    if (!userResponse || !userResponse.ok) {
      redirect("/");
      return;
    }

    const userData = await userResponse.json();
    return (
      <>
        <ProfileEditForm userData={userData.data} />
        <UserProfile username={decodeURI(username)} />
      </>
    );
  } catch (err) {
    console.log("redirecting...");
    redirect("/");
  }
};

export default UserProfileEditPage;
