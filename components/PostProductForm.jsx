import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useAuthContext } from "@/context/AuthContext";
import { useNotifications } from "@toolpad/core/useNotifications";

export default function PostProductForm({ setRefresh }) {
  const { activeUser, refreshToken } = useAuthContext();
  const [postText, setPostText] = useState("");
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content: postText,
    };

    try {
      refreshToken().then(async () => {
        try {
          const formData = new FormData(e.target);
          for (let image of e.target[2].files) {
            formData.append("files", image);
          }

          const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/posts",
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
        // mx: 3,
        p: 4,
      }}
      className="rounded-b-md bg-white"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block font-bold mb-2">
          💡 投稿してみよう
        </label>
        <Box
          component="div"
          sx={{ display: "flex", boxSizing: "border-box", gap: "1rem" }}
        >
          <Box sx={{ flexBasis: "50%" }}>
            <Link
              href={`/users/${activeUser?.username}`}
              className="inline-block h-fit hover:brightness-[.75] my-4 duration-200 shrink-0"
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
              id="name"
              name="name"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="商品名"
              label="商品名"
              onChange={(e) => setPostText(e.target.value)}
              sx={{ display: "block" }}
              value={postText}
            />
            <Button
              component="label"
              variant="contained"
              className="relative"
              sx={{
                display: "block",
                position: "relative",
                backgroundColor: "#f0f0f0",
                color: "#bbb",
                borderRadius: ".375rem",
                height: "10em",
                mx: "2em",
                my: 4,
                cursor: "pointer",
              }}
            >
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                className="invisible absolute"
                accept="image/*"
                multiple
              />
              サムネイル画像を追加
              <AddCircleOutlineIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "2rem",
                }}
              />
            </Button>
            <Button
              component="label"
              variant="contained"
              className="relative"
              sx={{
                display: "block",
                position: "relative",
                backgroundColor: "#f0f0f0",
                color: "#bbb",
                borderRadius: ".375rem",
                mx: "2em",
                mt: 4,
                cursor: "pointer",
              }}
            >
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                className="invisible absolute"
                accept="image/*"
                multiple
              />
              ファイルをアップロード
              <AddCircleOutlineIcon sx={{ position: "absolute", right: 8 }} />
            </Button>
            <TextField
              id="price"
              name="price"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="2000"
              label="値段"
              onChange={(e) => setPostText(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={postText}
            />
            <TextField
              id="content"
              name="content"
              variant="standard"
              rows={4}
              fullWidth
              multiline
              placeholder="商品の詳細"
              label="商品説明"
              onChange={(e) => setPostText(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={postText}
            />
            <TextField
              id="live_link"
              name="live_link"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="https://example.com/live"
              label="ライブURL"
              onChange={(e) => setPostText(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={postText}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#ddd",
              flexBasis: "50%",
              borderRadius: ".375rem",
            }}
          ></Box>
        </Box>
        <div className="flex justify-end pt-4 mt-2 gap-x-4">
          <Button type="submit" variant="contained" disabled={!postText}>
            投稿する
          </Button>
        </div>
      </form>
    </Box>
  );
}
