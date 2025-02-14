import React, { Suspense } from "react";
import Modal from "@/components/Modal";
import DetailPostForm from "@/components/DetailPostForm";
import CircularLoading from "@/components/loading/CircularLoading";
import PostProductForm from "@/components/PostProductForm";

const InterceptProductEditForm = () => {
  return (
    <Modal>
      <Suspense fallback={<CircularLoading />}>
        <PostProductForm />
      </Suspense>
    </Modal>
  );
};

export default InterceptProductEditForm;
