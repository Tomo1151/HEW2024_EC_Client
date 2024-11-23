"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import { fetchHeaders } from "@/config/fetchConfig";
import FollowUserColumn from "./FollowUserColumn";
import { useAuthContext } from "@/context/AuthContext";
import CircularLoading from "./loading/CircularLoading";

const FollowingUserList = ({ userData }) => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken } = useAuthContext();

  const fetchFollowingUsers = async () => {
    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${userData.username}/follows`,
          {
            method: "GET",
            cache: "no-store",
            headers: { ...fetchHeaders },
            credentials: "include",
          }
        );
        const resJson = await response.json();

        if (resJson.success) {
          console.log(resJson.data);
          setFollowingUsers(resJson.data);
        }
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchFollowingUsers();
    })();
  }, []);

  if (isLoading) {
    return (
      <Modal>
        <CircularLoading />
      </Modal>
    );
  }

  return (
    <Modal redirectPath={`/users/${userData.username}`}>
      {followingUsers.length === 0 ? (
        <p className="font-bold text-center text-xl">
          {userData.username}は誰もフォローしていません
        </p>
      ) : (
        <>
          <h2 className="mx-16 font-bold text-xl pb-8">フォロー一覧</h2>

          <ul>
            {followingUsers.map((user) => (
              <FollowUserColumn
                key={user.username}
                username={user.username}
                nickname={user.nickname}
                bio={user.bio}
                icon_link={user.icon_link}
                is_following={user.followers.length > 0}
              />
            ))}
          </ul>
        </>
      )}
    </Modal>
  );
};

export default FollowingUserList;
