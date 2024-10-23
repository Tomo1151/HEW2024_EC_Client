import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import DefaultButton from "@/components/DefaultButton";

import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";
import { useAuthContext } from "@/context/AuthContext";
// { postText, setPostText, setLatestPosts }
export default function PostForm() {
  const { activeUser, refreshToken } = useAuthContext();
  //   const { decodeImage } = useDecodedImage();
  //   const decodedImage = decodeImage(user.profile.image);
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch login API
    const payload = {
      content: postText,
    };

    try {
      await refreshToken();

      const response = await fetch(fetchBaseURL + "/posts", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const responseData = await response.json();
      //   setLatestPosts((prevPosts) => [responseData.post.post, ...prevPosts]);
      setPostText("");
    } catch (error) {
      console.error("Post failed.", error);
    }
  };

  return (
    <section className="my-8 p-8 shadow-lg rounded-md bg-white">
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
          <textarea
            className="w-full h-[150px] border-b-2 mx-2 py-4 resize-none focus:outline-none placeholder:px-2"
            id="postForm"
            placeholder="ここに入力"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
        </div>
        <div className="flex justify-end pt-4">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="
			text-sm text-slate-500
			file:bottom-2
			file:shadow
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-main-theme file:text-white
            hover:file:bg-white
            hover:file:text-main-theme
            hover:file:border-main-theme
            file:cursor-pointer
		  "
          />
          <DefaultButton>投稿する</DefaultButton>
        </div>
      </form>
    </section>
  );
}
