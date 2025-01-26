import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/utils/formatPrice";

const QuoteCard = ({
  image_link,
  author_name,
  author_icon,
  post_content,
  post_link,
  product,
  target = "_blank",
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
      <div className="relative bg-white mt-2 z-[9]">
        {post_link && (
          <Link
            href={post_link}
            target={target}
            className="inline sm:hidden absolute inset-0 w-full h-full z-10"
          ></Link>
        )}
        <div className="relative bg-white p-2 border border-[#e0e0e0] rounded-xl flex sm:p-4 hover:brightness-[.95] duration-200">
          {post_link && (
            <Link
              href={post_link}
              target={target}
              className="hidden sm:inline absolute inset-0 w-full h-full z-10 pointer-events-auto"
            ></Link>
          )}
          {image_link && (
            <div className="w-[7.5em] sm:w-[150px] mr-[.5em] sm:mr-[1em]">
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
          <div className="w-2/3 grow text-[12px] sm:text-[16px]">
            {/* ユーザー情報 */}
            <div className="flex items-center pb-1 sm:pb-2">
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
            {product ? (
              <>
                <p className="text-[1em] line-clamp-1">{product.name}</p>
                <p className="text-[.9em] text-red-500">
                  {formatPrice(product.price_histories[0]?.price)}
                </p>
                <p className="text-[.9em] pt-1 line-clamp-2">{post_content}</p>
              </>
            ) : (
              <p className="text-[1em] line-clamp-3">{post_content}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteCard;
