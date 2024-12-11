"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";

import Modal from "@/components/Modal";

import { useUserContext } from "@/context/UserContext";
import IconUploader from "./IconUploader";

const ProfileEditForm = ({ userData }) => {
  const router = useRouter();
  const { activeUser, refreshToken } = useUserContext();

  const username = userData.username;
  const [nickname, setNickname] = useState(userData.nickname || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [homepageLink, setHomepageLink] = useState(
    userData.homepage_link || ""
  );
  // const [iconLink, setIconLink] = useState(userData.icon_link || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const icon = e.target[0].files[0];
    const formData = new FormData(e.target);
    if (icon) {
      formData.append("icon", icon);
    }

    console.dir(formData.get("bio"));

    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username}`,
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          }
        );

        const resJson = await response.json();
        if (resJson.success) {
          router.refresh();
          router.push(`/users/${username}`, { scroll: false });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      activeUser === false ||
      (activeUser && activeUser?.username !== username)
    ) {
      router.push(`/users/${username}`, { scroll: false });
    }
  }, [activeUser]);

  return (
    activeUser?.username === username && (
      <Modal redirectPath={`/users/${username}/`}>
        <h2 className="text-xl">😎 プロフィールを編集</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ textAlign: "right" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconUploader
              width={100}
              height={100}
              src_img={
                userData.icon_link
                  ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${userData.icon_link}`
                  : "https://placeholder.com/150"
              }
            />
          </Box>
          <TextField
            label="ニックネーム"
            name="nickname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nickname || ""}
            onChange={(e) => setNickname(e.target.value)}
            autoFocus
          />
          <TextField
            label="自己紹介"
            name="bio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            autoFocus
          />
          <TextField
            label="ホームページ"
            name="homepage_link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={homepageLink || ""}
            onChange={(e) => setHomepageLink(e.target.value)}
            autoFocus
          />
          {/* <TextField
            label="アイコンリンク"
            name="icon_link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={iconLink || ""}
            onChange={(e) => setIconLink(e.target.value)}
            autoFocus
          /> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            更新
          </Button>
        </Box>
      </Modal>
    )
  );
};

export default ProfileEditForm;
