"use server";

import { cookies } from "next/headers";
import UserProfile from "@/app/users/[username]/page";
import Modal from "@/components/Modal";
import ProfileEditForm from "@/components/ProfileEditForm";

import { fetchHeaders } from "@/config/fetchConfig";

const UserProfileEditPage = async ({ params }) => {
  const username = params.username;
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username}`,
    {
      cache: "no-store",
      headers: { Cookie: cookies().toString(), ...fetchHeaders },
    }
  );

  const userData = await userResponse.json();

  return (
    <>
      <Modal redirectPath={`/users/${username}/`}>
        <ProfileEditForm userData={userData.data} />
      </Modal>
      <UserProfile username={username} />
    </>
  );
};

export default UserProfileEditPage;
