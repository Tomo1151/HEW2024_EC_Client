import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

const PostCard = ({
  children,
  image_link,
  sellerName,
  sellerIcon,
  post_link,
  is_superuser,
  target = "_self",
}) => {
  // console.log(image_link, sellerName, sellerIcon, post_link);
  return (
    <>
      <div className="relative bg-white p-2 hover:brightness-[.95] sm:hover:brightness-100 duration-200">
        {post_link && (
          <a
            href={post_link}
            target={target}
            className="inline sm:hidden absolute inset-0 w-full h-full z-10"
          ></a>
        )}
        <div className="relative bg-white py-2 sm:border border-[#e0e0e0] rounded-xl flex sm:p-4 sm:hover:brightness-[.95] duration-200">
          {post_link && (
            <a
              href={post_link}
              target={target}
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
          <div className="w-8/12 ml-0 sm:ml-3 grow text-[12px] sm:text-[16px]">
            {/* ユーザー情報 */}
            <div className="flex items-center pb-3">
              <Image
                src={sellerIcon}
                alt="アイコン"
                className="rounded-full mr-3 w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] object-cover"
                width={50}
                height={50}
              />
              <p className="font-bold tracking-[.075em] grow truncate">
                {sellerName}
                {is_superuser && (
                  <Tooltip title="管理者" placement="top">
                    <VerifiedRoundedIcon
                      sx={{
                        fontSize: "1.25em",
                        color: "gold",
                        mb: 0.5,
                        ml: 0.5,
                      }}
                    />
                  </Tooltip>
                )}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
