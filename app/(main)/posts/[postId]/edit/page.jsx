import React, { Suspense } from "react";
import { Box } from "@mui/material";
import DetailPostForm from "@/components/DetailPostForm";
import CircularLoading from "@/components/loading/CircularLoading";
import PostProductForm from "@/components/PostProductForm";

const ProductEditForm = () => {
  return (
    <Box component="section">
      <Suspense fallback={<CircularLoading />}>
        <PostProductForm />
      </Suspense>
    </Box>
  );
};

export default ProductEditForm;
