import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useUserContext } from "@/context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";

export default function ReplyForm({ postId, setRefresh }) {
  const { activeUser, refreshToken } = useUserContext();
  const [postText, setPostText] = useState("");
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      refreshToken().then(async () => {
        try {
          const formData = new FormData(e.target);
          // for (let image of e.target[2].files) {
          //   formData.append("files", image);
          // }

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/posts/${postId}/reply`,
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(response.status);
          }
          const resJson = await response.json();

          if (resJson.success) {
            setPostText("");
            setRefresh((prev) => !prev);
            notifications.show("ポストが正常に投稿されました", {
              severity: "success",
              autoHideDuration: 3000,
            });
          } else {
            notifications.show("ポストの投稿に失敗しました", {
              severity: "error",
              autoHideDuration: 3000,
            });
          }
        } catch (error) {
          console.error("Post failed.", error);
        }
      });
    } catch (error) {
      console.error("Post failed.", error);
    }
  };

  return (
    <Box
      component="section"
      maxWidth="md"
      sx={{
        px: { xs: 2, sm: 4 },
        pb: { xs: 1, sm: 4 },
        mb: "2px",
      }}
      className="bg-white"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
        <div className="flex">
          <Link
            href={`${activeUser ? `/users/${activeUser.username}` : "/login"}`}
            className="w-[3.5em] sm:w-[50px] h-[3.5em] sm:h-[50px] hover:brightness-[.75] duration-200 mr-4 my-4 shrink-0"
            scroll={false}
          >
            <Image
              src={`${activeUser?.image_link || "https://placeholder.com/150"}`}
              width={50}
              height={50}
              alt="自分のユーザーアイコン"
              className="h-fit rounded-full"
            />
          </Link>
          <TextField
            id="postForm"
            name="content"
            variant="standard"
            minRows={2}
            maxRows={5}
            fullWidth
            multiline
            placeholder="返信をポストする"
            onChange={(e) => setPostText(e.target.value)}
            sx={{ display: "block", mx: "1em", my: "1em" }}
            value={postText}
          />
          <div className="flex justify-end py-4 gap-x-4 shrink-0 items-end">
            <Button
              type="submit"
              variant="contained"
              disabled={!postText}
              sx={{ height: "fit-content" }}
            >
              投稿する
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
}
