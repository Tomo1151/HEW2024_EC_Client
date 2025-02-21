"use server";

import { headers } from "next/headers";
import ProfileContainer from "@/components/ProfileContainer";
import MainColumnHeader from "@/components/MainColumnHeader";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

const UserProfile = async ({ params, username }) => {
  // const userResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username || params.username}`,
  //   {
  //     cache: "no-store",
  //     headers: { Cookie: cookies().toString(), ...fetchHeaders },
  //   }
  // );

  // if (userResponse.status === 404) {
  //   notFound();
  // }

  // const userJson = await userResponse.json();

  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">
          {username || decodeURI(params.username)}
        </h3>
      </MainColumnHeader>
      <ProfileContainer username={username || decodeURI(params.username)} />
    </ThemeProvider>
  );
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

export default UserProfile;
