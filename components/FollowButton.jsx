import { Button } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";

const FollowButton = ({
  username,
  is_following,
  set_is_following,
  sx = {},
}) => {
  const { refreshToken } = useUserContext();
  const [isFollowing, setIsFollowing] = useState(is_following);

  const handleOnClick = async () => {
    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username}/follow`,
          {
            method: isFollowing ? "DELETE" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const resJson = await response.json();
        if (resJson.success) {
          // console.log(resJson);
          if (set_is_following) set_is_following((prev) => !prev);
          setIsFollowing((prev) => !prev);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outlined" : "contained"}
      color="primary"
      onClick={handleOnClick}
      sx={sx}
    >
      {isFollowing ? "フォロー中" : "フォローする"}
    </Button>
  );
};

export default FollowButton;
