import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";
import { useAuthContext } from "@/context/AuthContext";

export default function PostForm({ setRefresh }) {
  const { activeUser, refreshToken } = useAuthContext();
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content: postText,
    };

    try {
      refreshToken().then(async () => {
        try {
          const response = await fetch(fetchBaseURL + "/posts", {
            method: "POST",
            headers: fetchHeaders,
            body: JSON.stringify(payload),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(response.status);
          }

          if (resJson.success) {
            setPostText("");
            setRefresh((prev) => !prev);
          } else {
            console.error("Post failed.", resJson);
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
        mx: 3,
        p: 4,
      }}
      className="shadow-lg rounded-b-md bg-white"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="postForm" className="block font-bold mb-2">
          💡 投稿してみよう
        </label>
        <div className="flex">
          <Link
            href={`/users/${activeUser.username}`}
            className="h-fit hover:brightness-[.75] duration-200 mr-4 my-4 shrink-0"
          >
            <Image
              src={`${activeUser.image_link || "https://placeholder.com/150"}`}
              width={50}
              height={50}
              alt="自分のユーザーアイコン"
              className="h-fit rounded-full"
            />
          </Link>
          <TextField
            id="postForm"
            name="postContent"
            variant="standard"
            rows={4}
            fullWidth
            multiline
            placeholder="ここに入力"
            onChange={(e) => setPostText(e.target.value)}
            sx={{ display: "block", ml: "1em", my: "1em" }}
            value={postText}
          />
        </div>
        <div className="flex justify-end pt-4 gap-x-4">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon></CloudUploadIcon>}
            className="relative"
          >
            <input type="file" className="invisible absolute" />
            画像を追加
          </Button>
          <Button type="submit" variant="contained" disabled={!postText}>
            投稿する
          </Button>
        </div>
      </form>
    </Box>
  );
}
