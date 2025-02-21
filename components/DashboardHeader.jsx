"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/system";
import { useUserContext } from "@/context/UserContext";
import CircularLoading from "./loading/CircularLoading";

const DashboardHeader = () => {
  const { activeUser, logout } = useUserContext();
  const { push } = useRouter();

  if (activeUser === false) {
    push("/");
  }

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          px: {
            xs: 2,
            sm: 4,
          },
          pt: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" className="h-[75px]">
          <Image
            src="/miseba_logo_image_invert.svg"
            alt="logo"
            width={700}
            height={573}
            className="w-full h-full"
            priority
          />
        </Link>
        <p className="text-white cursor-pointer" onClick={logout}>
          ログアウト
        </p>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
