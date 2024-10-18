import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

const Post = ({
  username,
  nickname,
  icon_link,
  content,
  comment_count,
  ref_count,
  like_count,
  created_at,
}) => {
  return (
    <section className="bg-white my-8 p-8 shadow-lg rounded-md">
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
          <p className="mt-8 pb-2">{content}</p>
          {/* <Link href="/tags/" className="text-blue-400 mt-8 px-2 hover:underline">
        #{content}
      </Link> */}
          <div className="flex justify-start gap-x-20  border-gray-300 pt-8">
            <div>
              <FontAwesomeIcon
                icon={faMessage}
                size="xl"
                style={{ color: "#555" }}
                className="pr-4"
              />
              {comment_count || 0}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faRepeat}
                size="xl"
                style={{ color: "#555" }}
                className="pr-4"
              />
              {ref_count || 0}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faHeart}
                size="xl"
                style={{ color: "#555" }}
                className="pr-4"
              />
              {like_count || 0}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
