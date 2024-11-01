import Image from "next/image";
import Link from "next/link";

import PostReaction from "./PostReaction";

const Post = ({
  type,
  repost_user,
  postId,
  username,
  nickname,
  icon_link,
  content,
  comment_count,
  ref_count,
  like_count,
  created_at,
  is_reposted,
  is_liked,
  is_clickable = true,
  setRefresh,
}) => {
  return (
    <section className="relative bg-white my-8 p-8 shadow-lg rounded-md">
      {is_clickable && (
        <Link
          href={`/posts/${postId}`}
          className="absolute inset-0 w-full h-full z-10"
        />
      )}
      {type === "repost" && (
        <p className="font-bold pb-4 text-gray-300">
          {repost_user.nickname || repost_user.username}がリポストしました
        </p>
      )}
      <div className="flex">
        <div>
          <Link
            href={`/users/${username}`}
            className="h-fit hover:brightness-[.75] rounded-full duration-200"
          >
            <Image
              src={icon_link || "https://placeholder.com/150"}
              width="50"
              height="50"
              className="rounded-full mr-4"
              alt="ユーザーアイコン"
            />
          </Link>
        </div>
        <div className="px-2 grow">
          <div>
            <Link
              href={`/users/${username}`}
              className="font-bold hover:underline tracking-[.075em]"
            >
              {nickname || username}
            </Link>
            <p className="select-none font-bold opacity-35">
              {new Date(created_at).toLocaleString("ja-JP")}
            </p>
          </div>
          <p className="mt-2 pb-2">{content}</p>
          <PostReaction
            postId={postId}
            comment_count={comment_count}
            ref_count={ref_count}
            like_count={like_count}
            is_reposted={is_reposted}
            is_liked={is_liked}
            setRefresh={setRefresh}
          />
          {/*  */}
        </div>
      </div>
    </section>
  );
};

export default Post;
