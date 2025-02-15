import React, { Suspense } from "react";
import { Box } from "@mui/material";
import CircularLoading from "@/components/loading/CircularLoading";
import EditProductForm from "@/components/EditProductForm";

const ProductEditForm = ({ params }) => {
  console.log(params);
  return (
    <Box component="section">
      <Suspense fallback={<CircularLoading />}>
        <EditProductForm postId={params.postId} />
      </Suspense>
    </Box>
  );
};

export default ProductEditForm;
