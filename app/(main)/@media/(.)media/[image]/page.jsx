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
        onClick={router.replace.bind(null, "/")}
      ></div>
      <div className="fixed inset-0 m-auto w-fit max-w-[90vw] max-h-[90vh] z-50">
        <CancelRoundedIcon
          className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-800 transition-colors duration-200"
          sx={{ fontSize: 30 }}
          onClick={router.replace.bind(null, "/")}
        />
        <Image
          src={urlForImage(image, "images")}
          width={800}
          height={800}
          className="block w-fit max-h-full object-contain pointer-events-none"
          alt="投稿画像"
        />
      </div>
    </>
  );
};

export default Media;
