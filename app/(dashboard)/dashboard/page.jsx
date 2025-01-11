"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@mui/material";

import { useUserContext } from "@/context/UserContext";
import { urlForImage } from "@/utils/utils";

const page = () => {
  const { activeUser } = useUserContext();
  return (
    <Container
      sx={{
        backgroundColor: "#f0f0f0",
        maxWidth: "1000px",
        px: 4,
        py: 2,
        mx: "auto",
      }}
    >
      <h1>Dashboard</h1>
      <Link href={`/users/${activeUser?.username}`}>
        <Image
          src={urlForImage(activeUser?.icon_link)}
          width={150}
          height={150}
          alt="ユーザーアイコン"
          priority
        />
      </Link>
      <p>
        This is a dashboard page. It is a protected route that is only
        accessible to authenticated users.
      </p>
    </Container>
  );
};

export default page;
