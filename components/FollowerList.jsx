"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import { fetchHeaders } from "@/config/fetchConfig";
import FollowUserColumn from "./FollowUserColumn";
import { useUserContext } from "@/context/UserContext";

const FollowerList = ({ userData }) => {
  const [followers, setFollowers] = useState([]);
  const { refreshToken } = useUserContext();

  const fetchFollowers = async () => {
    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${userData.username}/followers`,
          {
            method: "GET",
            cache: "no-store",
            headers: { ...fetchHeaders },
            credentials: "include",
          }
        );
        const resJson = await response.json();

        if (resJson.success) {
          // console.log(resJson.data);
          setFollowers(resJson.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchFollowers();
    })();
  }, []);

  return (
    <Modal redirectPath={`/users/${userData.username}`}>
      {followers.length === 0 ? (
        <p className="font-bold text-center text-xl">
          {userData.username}は誰にもフォローされていません
        </p>
      ) : (
        <>
          <h2 className="mx-16 font-bold text-xl pb-8">フォロワー一覧</h2>
          <ul>
            {followers.map((user) => (
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

export default FollowerList;
