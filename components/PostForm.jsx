import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Chip, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";

import { useUserContext } from "@/context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import FormImagePreview from "./FormImagePreview";
import { urlForImage } from "@/utils/utils";
import QuoteCard from "./QuoteCard";
import { formatPostBody } from "@/utils/postBodyFormat";

export default function PostForm({ quoteRef, setRefresh }) {
  const ref = useRef(null);
  const router = useRouter();

  const { activeUser, refreshToken } = useUserContext();
  const [postText, setPostText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState([]);
  const notifications = useNotifications();

  const [quotePost, setQuotePost] = useState(null);

  // console.log("quoteRef: ", quoteRef, "quotePost: ", quotePost);

  const fetchQuoteRef = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${quoteRef}`
      );
      const resJson = await response.json();

      if (resJson.success) {
        console.log("Quote fetched: ", resJson.data);
        setQuotePost(resJson.data);
      } else {
        notifications.show("引用元のポストが見つかりません", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error("Quote fetch failed.", error);
    }
  };

  const handleOnChange = (e) => {
    setImages([...images, ...e.target.files].slice(0, 4));
    e.target.value = "";
  };

  const handleSetTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!tagInput || tagInput.trim() === "") return;

      // console.log("Enter key pressed: ", `"${e.target.value}"`);
      const newTags = [...tags, tagInput.trim()];
      const uniqueTags = [...new Set(newTags)];
      setTags(uniqueTags);
      setTagInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      refreshToken().then(async () => {
        try {
          const formData = new FormData();
          formData.append("content", postText.trim());
          if (quoteRef) {
            formData.append("quoted_ref", quoteRef);
          }

          for (const image of images) {
            formData.append("files", image);
          }

          for (const tag of tags) {
            formData.append("tags[]", tag);
          }

          // console.log(formData.get("content"));
          console.log(formData.getAll("tags[]"));

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
            setTags([]);
            if (setRefresh) setRefresh((prev) => !prev);
            notifications.show("ポストが正常に投稿されました", {
              severity: "success",
              autoHideDuration: 3000,
            });
            router.push("/");
            // if (window) window.location.href = "/";
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

  useEffect(() => {
    if (quoteRef) {
      fetchQuoteRef();
    }
  }, [quoteRef]);

  return (
    <Box
      component="section"
      // maxWidth="md"
      sx={{
        p: { xs: 2, sm: 4 },
      }}
      className="rounded-b-md bg-white"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="postForm" className="block font-bold mb-2">
          💡 投稿してみよう
        </label>
        <div className="flex gap-x-1 sm:gap-x-4">
          <Link
            href={`/users/${activeUser?.username}`}
            className="h-fit hover:brightness-[.75] duration-200 my-4 shrink-0"
            scroll={false}
          >
            <Box
              sx={{
                width: { xs: "36px", sm: "50px" },
                height: { xs: "36px", sm: "50px" },
              }}
            >
              <Image
                src={urlForImage(activeUser?.icon_link)}
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

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <p className=" w-[50px] text-right shrink-0 mx-0 sm:mx-2">
            <label htmlFor="tag" className="font-bold w-full">
              タグ：
            </label>
          </p>
          <TextField
            id="tag"
            variant="standard"
            rows={1}
            placeholder="Enterまたは右のボタンで追加"
            sx={{ p: 0, ml: 2, flexGrow: 1 }}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleSetTags}
          />
          <Button
            type="button"
            color="black"
            onClick={() =>
              handleSetTags({ key: "Enter", preventDefault: () => {} })
            }
          >
            追加
          </Button>
        </Box>
        {tags && tags.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "#f0f0f0",
              p: 1,
              my: 2,
              borderRadius: "0.375em",
            }}
          >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={`# ${tag}`}
                color="primary"
                onDelete={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        )}

        {status &&
          status.map((message, index) => (
            <p key={index} className="text-center text-red-600 font-bold">
              {message}
            </p>
          ))}

        <FormImagePreview images={images} setImages={setImages} />

        {quoteRef && (
          <QuoteCard
            image_link={
              quotePost &&
              quotePost.images.length > 0 &&
              urlForImage(quotePost.images[0].image_link, "images")
            }
            author_name={quotePost && quotePost.author.username}
            author_icon={
              quotePost && urlForImage(quotePost.author?.icon_link, "icons")
            }
            post_content={quotePost && formatPostBody(quotePost.content)}
            post_link={quotePost && `/posts/${quotePost.id}`}
            is_loading={quotePost === null}
          />
        )}

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
