"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { urlForImage } from "@/utils/utils";

const Media = () => {
  const { image } = useParams();
  const router = useRouter();

  console.log(image);
  return (
    <>
      <div></div>
      <div
        id="modal_overlay"
        className="fixed inset-0 w-[100dvw] h-[100dvh] bg-black opacity-40 cursor-pointer z-[49]"
        onClick={router.back}
      ></div>
      <div className="flex items-center fixed inset-0 m-auto w-fit h-fit max-w-[90dvw] max-h-[90dvh] z-50">
        <div className="relative w-fit h-fit max-w-[90dvw] max-h-[90dvh]">
          <CancelRoundedIcon
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-800 transition-colors duration-200"
            sx={{ fontSize: 30 }}
            onClick={router.back}
          />
          <Image
            src={urlForImage(image, "images")}
            width={800}
            height={800}
            className="block w-fit max-w-[90dvw] max-h-[90dvh] object-contain object-center rounded-xl pointer-events-none"
            alt="投稿画像"
          />
        </div>
      </div>
    </>
  );
};

export default Media;
