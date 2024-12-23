import Image from "next/image";
import Link from "next/link";

import { useUserContext } from "@/context/UserContext";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box, Button, Rating } from "@mui/material";
import FollowButton from "@/components/FollowButton";
import { StarRateOutlined, StarRateRounded } from "@mui/icons-material";

const Step3 = () => {
  const { cartItems } = useUserContext();

  if (!cartItems) {
    return <CircularLoading />;
  }

  const uniqUsers = Array.from(
    new Map(
      cartItems.map((item) => [
        item.product.post.author.id,
        item.product.post.author,
      ])
    ).values()
  );

  console.log("Step0");
  console.log(uniqUsers);
  return (
    <>
      <Box
        sx={{
          px: 4,
          py: 2,
        }}
      >
        <h3 className="text-xl font-bold">購入完了</h3>
      </Box>
      {uniqUsers.map((user) => (
        <Box key={user.id}>
          <Box
            sx={{
              display: "flex",
              borderTop: "1px solid #e0e0e0",
              px: 4,
              py: 2,
              my: 2,
            }}
          >
            <Box sx={{ width: 50, height: 50, mr: 4 }}>
              <Link
                href={`/users/${user.username}`}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:brightness-[.85] rounded-full duration-200"
              >
                <Image
                  src={
                    user.icon_link
                      ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${user.icon_link}`
                      : "https://placeholder.com/150"
                  }
                  width={50}
                  height={50}
                  priority
                  className="h-full rounded-full object-cover"
                  alt="商品のサムネイル画像"
                />
              </Link>
            </Box>
            <Box>
              <Link
                href={`/users/${user.username}`}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline"
              >
                <p className="font-bold">{user.nickname || user.username}</p>
              </Link>
              <Link
                href={`/users/${user.username}`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                このユーザーの他の商品も見る →
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <FollowButton />
            </Box>
          </Box>
          <Box sx={{ my: 4 }}>
            <p className="text-center">このユーザーを評価してみませんか？</p>
            <p className="text-center">
              <Rating
                name="rating"
                defaultValue={0}
                precision={0.5}
                icon={<StarRateRounded fontSize="inherit" />}
                emptyIcon={<StarRateRounded fontSize="inherit" />}
                sx={{ fontSize: "3em" }}
              />
            </p>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Step3;
