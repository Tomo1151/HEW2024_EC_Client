import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div
        id="mdoal_overlay"
        className="fixed inset-0 w-[100dvw] h-[100dvh] bg-black opacity-40  z-40 "
        onClick={router.back}
      ></div>
      <div className="fixed bg-white w-[600px] h-[600px] rounded-md inset-0 m-auto px-8 py-16 z-50">
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          className="absolute top-6 right-8 cursor-pointer hover:drop-shadow"
          onClick={router.back}
        />
        {/* <span className="absolute top-8 right-8" onClick={router.back}>
          ×
        </span> */}
        <div className="mt-2">{children}</div>
      </div>
    </>
  );
};

export default Modal;
