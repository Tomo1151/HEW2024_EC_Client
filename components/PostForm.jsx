import Image from "next/image";
import Link from "next/link";

import { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";

import { useUserContext } from "@/context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import FormImagePreview from "./FormImagePreview";

export default function PostForm({ setRefresh }) {
  const ref = useRef(null);

  const { activeUser, refreshToken } = useUserContext();
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState([]);
  const notifications = useNotifications();

  const handleOnChange = (e) => {
    setImages([...images, ...e.target.files].slice(0, 4));
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      refreshToken().then(async () => {
        try {
          const formData = new FormData();
          formData.append("content", postText.trim());
          for (let image of images) {
            formData.append("files", image);
          }

          // console.log(formData.get("content"));
          console.log(formData.getAll("files"));

          const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/posts",
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );

          const resJson = await response.json();

          if (resJson.success) {
            setPostText("");
            setImages([]);
            setStatus([]);
            if (setRefresh) setRefresh((prev) => !prev);
            notifications.show("ポストが正常に投稿されました", {
              severity: "success",
              autoHideDuration: 3000,
            });
          } else {
            setStatus(resJson.error);
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
      // maxWidth="md"
      sx={{
        p: 4,
      }}
      className="rounded-b-md bg-white"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="postForm" className="block font-bold mb-2">
          💡 投稿してみよう
        </label>
        <div className="flex">
          <Link
            href={`/users/${activeUser?.username}`}
            className="h-fit hover:brightness-[.75] duration-200 mr-4 my-4 shrink-0"
            scroll={false}
          >
            <Box sx={{ width: "50px", height: "50px" }}>
              <Image
                src={
                  activeUser?.icon_link
                    ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${activeUser?.icon_link}`
                    : "https://placeholder.com/150"
                }
                width={50}
                height={50}
                alt="自分のユーザーアイコン"
                className="rounded-full object-cover w-full h-full"
              />
            </Box>
          </Link>
          <TextField
            id="postForm"
            name="content"
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
        {status &&
          status.map((message, index) => (
            <p key={index} className="text-center text-red-600">
              {message}
            </p>
          ))}
        <p className="text-center text-red-600">{status}</p>

        <FormImagePreview images={images} setImages={setImages} />

        <div className="flex justify-end pt-4 gap-x-4">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon></CloudUploadIcon>}
            className="relative"
          >
            <input
              type="file"
              className="invisible absolute"
              accept="image/*"
              name="files"
              ref={ref}
              onChange={handleOnChange}
              multiple
              disabled={images.length >= 4}
            />
            画像を追加
          </Button>
          {images.length > 0 && (
            <Button variant="outlined" onClick={() => setImages([])}>
              画像をクリア
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={!postText.trim()}>
            投稿する
          </Button>
        </div>
      </form>
    </Box>
  );
}
