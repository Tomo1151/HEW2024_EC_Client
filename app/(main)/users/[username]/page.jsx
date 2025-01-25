"use server";

import ProfileContainer from "@/components/ProfileContainer";
import { fetchHeaders } from "@/config/fetchConfig";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
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

export default UserProfile;
