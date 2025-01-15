import { Suspense } from "react";

import DetailPostForm from "@/components/DetailPostForm";
import Modal from "@/components/Modal";

const InterceptPostForm = () => {
  return (
    <Modal>
      <Suspense>
        <DetailPostForm />
      </Suspense>
    </Modal>
  );
};

export default InterceptPostForm;
