"use server";

import ProfileContainer from "@/components/ProfileContainer";
import { fetchHeaders } from "@/config/fetchConfig";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import MainColumnHeader from "@/components/MainColumnHeader";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

const UserProfile = async (route) => {
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${route.params.username}`,
    {
      cache: "no-store",
      headers: { Cookie: cookies().toString(), ...fetchHeaders },
    }
  );

  if (userResponse.status === 404) {
    notFound();
  }

  const userJson = await userResponse.json();

  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">
          {userJson.data?.username || "名無し"}
        </h3>
      </MainColumnHeader>
      <ProfileContainer user={userJson.data} />
    </ThemeProvider>
  );
};

export default UserProfile;
