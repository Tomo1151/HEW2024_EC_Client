import { Suspense } from "react";

import { Box } from "@mui/material";
import DetailPostForm from "@/components/DetailPostForm";

const PostPage = () => {
  return (
    <Box component="section" sx={{ mx: 3 }}>
      <Suspense>
        <DetailPostForm />
      </Suspense>
    </Box>
  );
};

export default PostPage;
