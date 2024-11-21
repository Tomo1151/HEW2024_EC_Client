"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = ({ children, redirectPath }) => {
  const router = useRouter();
  console.log(redirectPath);
  return (
    <>
      <div
        id="mdoal_overlay"
        className="fixed inset-0 w-[100dvw] h-[100dvh] bg-black opacity-40  z-[49]"
        onClick={
          redirectPath
            ? router.push.bind(null, redirectPath, { scroll: false })
            : router.back
        }
      ></div>
      <div className="fixed bg-white w-[800px] h-fit max-h-[90vh] rounded-md inset-0 m-auto px-8 py-16 z-50 overflow-y-auto">
        <IconButton
          size="large"
          className="absolute top-6 right-8 cursor-pointer hover:drop-shadow"
          onClick={
            redirectPath
              ? router.push.bind(null, redirectPath, { scroll: false })
              : router.back
          }
        >
          <CloseRoundedIcon />
        </IconButton>
        <div className="mt-2">{children}</div>
      </div>
    </>
  );
};

export default Modal;
