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

export async function generateMetadata({}) {
  return {
    title: "投稿ページ | Miseba",
    description: "投稿ページ",
  };
}

export default PostPage;
