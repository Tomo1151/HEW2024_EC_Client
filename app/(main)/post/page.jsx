import { Suspense } from "react";

import { Box } from "@mui/material";
import DetailPostForm from "@/components/DetailPostForm";

const PostPage = () => {
  return (
    <Box component="section">
      <Suspense>
        <DetailPostForm />
      </Suspense>
    </Box>
  );
};

export default PostPage;
