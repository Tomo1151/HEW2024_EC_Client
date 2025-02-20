import Link from "next/link";
import { Box, Tooltip } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import { useUserContext } from "@/context/UserContext";
import FollowButton from "./FollowButton";
import Image from "next/image";
import { urlForImage } from "@/utils/utils";

const FollowUserColumn = ({
  username,
  nickname,
  bio,
  icon_link,
  is_following,
  is_detail,
  is_superuser,
}) => {
  const { activeUser } = useUserContext();
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        position: "relative",
        columnGap: 2,
        // mx: 4,
        px: { xs: 0, sm: 4 },
        py: 2,
        // borderRadius: ".375rem",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      <Link
        href={`/users/${username}`}
        scroll={false}
        className="absolute inset-0 w-full h-full"
      />
      <Box sx={{ width: "50px", height: "50px", flexShrink: 0 }}>
        <Image
          src={urlForImage(icon_link)}
          width={50}
          height={50}
          alt="ユーザーアイコン"
          className="rounded-full mx-auto h-full object-cover hover:brightness-[.75] duration-200"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p className="font-bold pt-2 tracking-wider hover:underline truncate">
              {nickname || username}
              {is_superuser && (
                <Tooltip title="管理者" placement="top">
                  <VerifiedRoundedIcon
                    sx={{
                      fontSize: "1.25em",
                      color: "gold",
                      mb: 0.5,
                      ml: 0.5,
                    }}
                  />
                </Tooltip>
              )}
            </p>
          </Box>

          {activeUser && activeUser.username !== username && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 0,
                pt: 1,
              }}
            >
              <FollowButton username={username} is_following={is_following} />
            </Box>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", pt: 1 }}>
          {bio && (
            <p className="">
              {bio.length > 50 ? bio.slice(0, 50) + "..." : bio}
            </p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FollowUserColumn;
