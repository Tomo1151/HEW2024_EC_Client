import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const PostImageContainer = ({ images }) => {
  const styles = [
    {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr",
      gridColumn: ["1"],
      gridRow: ["1"],
      imageHeight: ["h-[300px]"],
      borderRadiuses: ["rounded-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
      gridColumn: ["1", "2"],
      gridRow: ["1"],
      imageHeight: ["h-[300px]", "h-[300px]"],
      borderRadiuses: ["rounded-l-xl", "rounded-r-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "2fr",
      gridColumn: ["1", "2", "1"],
      gridRow: ["1", "1 / 3", "2"],
      imageHeight: ["h-[125px]", "h-[300px]", "h-[125px]"],
      borderRadiuses: ["rounded-tl-xl", "rounded-r-xl", "rounded-bl-xl"],
    },
    {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gridColumn: ["1", "2", "1", "2"],
      gridRow: ["1", "1", "2", "2"],
      imageHeight: ["h-[125px]", "h-[125px]", "h-[125px]", "h-[125px]"],
      borderRadiuses: [
        "rounded-tl-xl",
        "rounded-tr-xl",
        "rounded-bl-xl",
        "rounded-br-xl",
      ],
    },
  ];

  if (images.length > 4) {
    images = images.slice(0, 4);
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: "2px",
        gridTemplateColumns: styles[images.length - 1].gridTemplateColumns,
        gridTemplateRows: styles[images.length - 1].gridTemplateRows,
      }}
    >
      {images.map((image, index) => (
        <Link
          key={image.image_link}
          href={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${image.image_link}`}
          target="_blank"
          style={{
            gridColumn: styles[images.length - 1].gridColumn[index],
            gridRow: styles[images.length - 1].gridRow[index],
          }}
          className={`relative z-10 ${styles[images.length - 1].imageHeight[index]}`}
        >
          {/* <div className="mt-4"> */}
          <Image
            src={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${image.image_link}`}
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
};

export default PostImageContainer;
