"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import { fetchHeaders } from "@/config/fetchConfig";
import { useAuthContext } from "@/context/AuthContext";

const ProfileEditForm = ({ userData }) => {
  const router = useRouter();
  const { refreshToken } = useAuthContext();

  const [nickname, setNickname] = useState(userData.nickname || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [homepageLink, setHomepageLink] = useState(
    userData.homepage_link || ""
  );
  const [iconLink, setIconLink] = useState(userData.icon_link || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${userData.username}`,
          {
            method: "PUT",
            headers: {
              ...fetchHeaders,
            },
            body: JSON.stringify({
              nickname,
              bio,
              homepage_link: homepageLink,
              icon_link: iconLink,
            }),
            credentials: "include",
          }
        );

        const resJson = await response.json();
        if (resJson.success) {
          console.log(resJson);
          router.push(`/users/${userData.username}`, { scroll: false });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-xl">😎 プロフィールを編集</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "right" }}>
        <TextField
          label="ニックネーム"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
          autoFocus
        />
        <TextField
          label="自己紹介"
          variant="outlined"
          fullWidth
          margin="normal"
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          autoFocus
        />
        <TextField
          label="ホームページ"
          variant="outlined"
          fullWidth
          margin="normal"
          value={homepageLink || ""}
          onChange={(e) => setHomepageLink(e.target.value)}
          autoFocus
        />
        <TextField
          label="アイコンリンク"
          variant="outlined"
          fullWidth
          margin="normal"
          value={iconLink || ""}
          onChange={(e) => setIconLink(e.target.value)}
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          更新
        </Button>
      </Box>
    </>
  );
};

export default ProfileEditForm;
