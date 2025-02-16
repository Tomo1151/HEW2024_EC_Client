import React, { Suspense } from "react";
import Modal from "@/components/Modal";
import CircularLoading from "@/components/loading/CircularLoading";
import EditProductForm from "@/components/EditProductForm";

const InterceptProductEditForm = (route) => {
  console.log(route);
  return (
    <Modal>
      <Suspense fallback={<CircularLoading />}>
        <EditProductForm postId={route.params.postId} />
      </Suspense>
    </Modal>
  );
};

export default InterceptProductEditForm;
