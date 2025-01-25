"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { urlForImage } from "@/utils/utils";
import MainColumnHeader from "@/components/MainColumnHeader";

const Media = () => {
  const { image } = useParams();

  return (
    <>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">画像</h3>
      </MainColumnHeader>
      <Image
        src={urlForImage(image, "images")}
        width={800}
        height={800}
        className="block w-full object-contain object-center select-none pointer-events-none"
        alt="投稿画像"
      />
    </>
  );
};

export default Media;
