import { urlForImage } from "@/utils/utils";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { useEffect, memo } from "react";

const PostImageContainer = memo(({ images, is_preview }) => {
  // console.log(images);
  const styles = [
    {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr",
      gridColumn: ["1"],
      gridRow: ["1"],
      imageHeight: ["h-[18.75em]"],
      borderRadiuses: ["rounded-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
      gridColumn: ["1", "2"],
      gridRow: ["1"],
      imageHeight: ["h-[18.75em]", "h-[18.75em]"],
      borderRadiuses: ["rounded-l-xl", "rounded-r-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "2fr",
      gridColumn: ["1", "2", "1"],
      gridRow: ["1", "1 / 3", "2"],
      imageHeight: ["h-[9.375em]", "h-[18.75em]", "h-[9.375em]"],
      borderRadiuses: ["rounded-tl-xl", "rounded-r-xl", "rounded-bl-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gridColumn: ["1", "2", "1", "2"],
      gridRow: ["1", "1", "2", "2"],
      imageHeight: ["h-[9.375em]", "h-[9.375em]", "h-[9.375em]", "h-[9.375em]"],
      borderRadiuses: [
        "rounded-tl-xl",
        "rounded-tr-xl",
        "rounded-bl-xl",
        "rounded-br-xl",
      ],
    },
  ];

  // console.log(images);

  if (!is_preview && !images.every((image) => image.image_link != undefined)) {
    return null;
  }

  if (images.length > 4) {
    images = images.slice(0, 4);
  }

  if (is_preview) {
    images = images.map((image) => URL.createObjectURL(image));
  } else {
    images = images.map(
      (image) => urlForImage(image.image_link, "images")
      // `/api/images?url=${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${image.image_link}`
    );
  }

  useEffect(() => {
    return () => {
      images.forEach((imageUrl) => {
        URL.revokeObjectURL(imageUrl);
      });
    };
  }, [images]);

  // if (!is_preview) console.log("rendering PostImageContainer");

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gap: "2px",
        gridTemplateColumns: styles[images.length - 1].gridTemplateColumns,
        gridTemplateRows: styles[images.length - 1].gridTemplateRows,
      }}
    >
      {images.map((image_link, index) => (
        <Link
          key={image_link}
          href={image_link}
          target="_blank"
          style={{
            gridColumn: styles[images.length - 1].gridColumn[index],
            gridRow: styles[images.length - 1].gridRow[index],
          }}
          className={`relative z-10 ${styles[images.length - 1].imageHeight[index]}`}
        >
          {/* <div className="mt-4"> */}
          <Image
            src={image_link}
            width={1920}
            height={1080}
            className={`hover:brightness-95 duration-200 w-full h-full object-cover ${styles[images.length - 1].borderRadiuses[index]}`}
            alt="投稿画像"
            priority
          />
          {/* </div> */}
        </Link>
      ))}
    </Box>
  );
});

export default PostImageContainer;
