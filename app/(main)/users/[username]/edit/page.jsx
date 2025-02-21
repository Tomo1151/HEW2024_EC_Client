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

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/users/${params.username}`,
      {
        headers: {
          Origin:
            process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001",
        },
      }
    );
    const resJson = await response.json();

    if (response.status === 404) {
      // setPostData(null);
    }

    if (resJson.success) {
      const user = resJson.data;
      return {
        title: `${user.nickname || user.username} | Miseba`,
        description:
          user.bio || `${user.nickname || user.username}のプロフィール`,
        metadataBase:
          process.env.NEXT_PUBLIC_SITE_ORIGIN ||
          `https://${headers().get("host")}`,
        keywords:
          "ユーザー, プロフィール, 作品, クリエイター, 販売, イラスト, デザイン, 作家",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      title: "ユーザーページ",
      metadataBase:
        process.env.NEXT_PUBLIC_SITE_ORIGIN ||
        `https://${headers().get("host")}`,
      description: "ユーザーページ",
    };
  }
}

export default UserProfileEditPage;
