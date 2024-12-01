import { Box } from "@mui/material";
import Image from "next/image";

const PostImagePreview = ({ images }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{ position: "relative", width: "100px", height: "100px" }}
        >
          <Image
            src={URL.createObjectURL(image)}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostImagePreview;
