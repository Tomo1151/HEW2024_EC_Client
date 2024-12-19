import Link from "next/link";
import { Box, Button } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FollowButton from "./FollowButton";

const FollowUserColumn = ({
  username,
  nickname,
  bio,
  icon_link,
  is_following,
}) => {
  const { activeUser } = useUserContext();
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        position: "relative",
        columnGap: 4,
        mx: 4,
        px: 4,
        py: 2,
        borderRadius: ".375rem",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      <Link
        href={`/users/${username}`}
        scroll={false}
        className="absolute inset-0 w-full h-full"
      />
      <Box sx={{ width: "54px" }}>
        <img
          src={
            icon_link
              ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${icon_link}`
              : "https://via.placeholder.com/150"
          }
          alt="ユーザーアイコン"
          className="rounded-full mx-auto w-full h-full object-cover hover:brightness-[.75] duration-200"
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p className="font-bold pb-2 tracking-wider hover:underline">
            {nickname || username}
          </p>
          {bio && <p className="">{bio}</p>}
        </Box>

        {activeUser && activeUser.username !== username && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FollowButton username={username} is_following={is_following} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FollowUserColumn;
