import Link from "next/link";
import { Box, Chip } from "@mui/material";

const PostTags = ({ tags }) => {
  return (
    tags &&
    tags.length > 0 && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: ".5em",
          mb: 2,
        }}
      >
        {tags.map((tag, index) => (
          <a
            key={index}
            href={`/search?q=${tag}&src=tag_click`}
            className="relative hover:underline z-20 font-bold"
            // scroll={false}
          >
            {/* <Chip label={`#${tag}`} color="primary" sx={{}} /> */}
            <p className="mr-2 text-blue-500">#{tag}</p>
          </a>
        ))}
      </Box>
    )
  );
};

export default PostTags;
