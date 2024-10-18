import Image from "next/image";
import Link from "next/link";

const Post = ({ username, nickname, icon_link, content, created_at }) => {
  return (
    <section className="bg-white my-8 p-8 shadow-lg rounded-md">
      <div className="flex">
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
      </div>
      <p className="mt-8 px-2 pb-2">{content}</p>
      {/* <Link href="/tags/" className="text-blue-400 mt-8 px-2 hover:underline">
        #{content}
      </Link> */}
    </section>
  );
};

export default Post;
