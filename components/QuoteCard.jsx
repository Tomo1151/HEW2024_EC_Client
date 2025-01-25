import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const QuoteCard = ({
  image_link,
  author_name,
  author_icon,
  post_content,
  post_link,
  is_loading,
}) => {
  if (is_loading) {
    return (
      <div className="relative bg-white mt-2">
        <div className="relative bg-white p-2 border border-[#e0e0e0] rounded-xl flex sm:p-4 hover:brightness-[.95] duration-200">
          <Skeleton
            variant="rectangular"
            width={150}
            height={150}
            sx={{
              width: { xs: "7.5em", sm: "150px" },
              height: { xs: "7.5em", sm: "150px" },
              mr: ".5em",
            }}
            className="rounded-md object-cover aspect-square"
          />
          <div className="w-8/12 grow text-[12px] sm:text-[16px]">
            {/* ユーザー情報 */}
            <div className="flex items-center pb-3">
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{
                  width: { xs: "24px", sm: "40px" },
                  height: { xs: "24px", sm: "40px" },
                  mr: 3,
                }}
              />
              <Skeleton variant="text" width="100%" height={32} />
            </div>
            <Skeleton variant="text" width="100%" height={26} />
            <Skeleton variant="text" width="100%" height={26} />
            <Skeleton variant="text" width="100%" height={26} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-white mt-2">
        {post_link && (
          <a
            href={post_link}
            target="_blank"
            className="inline sm:hidden absolute inset-0 w-full h-full z-10"
          ></a>
        )}
        <div className="relative bg-white p-2 border border-[#e0e0e0] rounded-xl flex sm:p-4 hover:brightness-[.95] duration-200">
          {post_link && (
            <a
              href={post_link}
              target="_blank"
              className="hidden sm:inline absolute inset-0 w-full h-full"
            ></a>
          )}
          {image_link && (
            <div className="w-[7.5em] sm:w-[150px] mr-[.5em]">
              <Image
                src={image_link}
                alt="商品画像"
                width={240}
                height={240}
                className="rounded-md object-cover aspect-square"
                priority
              />
            </div>
          )}
          <div className="w-2/3 ml-0 sm:ml-2 grow text-[12px] sm:text-[16px]">
            {/* ユーザー情報 */}
            <div className="flex items-center pb-3">
              <Image
                src={author_icon}
                alt="アイコン"
                className="rounded-full mr-3 w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] object-cover"
                width={50}
                height={50}
              />
              <p className="font-bold tracking-[.075em] grow truncate">
                {author_name}
              </p>
            </div>
            <p className="text-[1em] line-clamp-3">{post_content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteCard;
