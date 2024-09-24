import Image from "next/image";
import Link from "next/link";

const Post = ({ content }) => {
  const post = {
    author: {
      user_name: "test",
    },
    content: "テスト投稿",
    created_at: "2022-01-01T00:00:00Z",
  };

  const profile_image = "https://placeholder.com/150";

  return (
    <section className="bg-white my-8 p-8 shadow-lg rounded-md">
      <div className="flex">
        <Link
          href={`/users/${post.author.user_name}`}
          className="h-fit hover:brightness-[.75] rounded-full duration-200"
        >
          <Image
            src={profile_image}
            width="50"
            height="50"
            className="rounded-full mr-4"
            alt="ユーザーアイコン"
          />
        </Link>
        <div>
          <Link
            href={`/users/${post.author.user_name}`}
            className="font-bold hover:underline tracking-[.075em]"
          >
            {post.author?.user_name || "名無し"}
          </Link>
          <p className="select-none font-bold opacity-35">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mt-8 px-2 pb-2">{post.content}</p>
      <Link href="/tags/" className="text-blue-400 mt-8 px-2 hover:underline">
        #{content}
      </Link>
    </section>
  );
};

export default Post;
