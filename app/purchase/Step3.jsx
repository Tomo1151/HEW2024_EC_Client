import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useUserContext } from "@/context/UserContext";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box, Button, Rating } from "@mui/material";
import FollowButton from "@/components/FollowButton";
import { StarRateRounded } from "@mui/icons-material";

const Step3 = () => {
  const { cartItems, fetchUserCart, clearUserCart } = useUserContext();
  const [isRated, setIsRated] = useState(
    Object.fromEntries(cartItems.map((item) => [item.product.id, false]))
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState(null);

  const items = useRef([]);

  console.log(cartItems);

  const ratingProduct = async (productId, rating) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/products/${productId}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: rating }),
          credentials: "include",
        }
      );

      const resJson = await response.json();

      if (resJson.success) {
        console.log("評価完了");
        setIsRated({
          ...isRated,
          [productId]: true,
        });
      }
      console.log(resJson);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const purchaseItems = async () => {
    if (isCompleted) return;

    const productIds = cartItems.map((item) => item.product.id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
          credentials: "include",
        }
      );

      const resJson = await response.json();
      console.log(resJson);
      if (resJson.success) {
        console.log("購入完了");
        items.current = cartItems;
        clearUserCart();
        setIsCompleted(true);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserCart().then(() => {
      purchaseItems();
    });
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <p>エラーが発生しました</p>
        <p>時間をおいてもう一度お試しください</p>
      </Box>
    );
  }

  if (!cartItems || !isCompleted || !items.current) {
    return <CircularLoading />;
  }

  const uniqUsers = Array.from(
    new Map(
      items.current.map((item) => [
        item.product.post.author.id,
        item.product.post.author,
      ])
    ).values()
  );

  uniqUsers.forEach((user, index) => {
    uniqUsers[index].products = items.current.filter(
      (item) => item.product.post.author.id === user.id
    );
  });

  console.log("Step0");
  console.log(items);
  console.log(items.current);
  console.log(uniqUsers);
  console.log(isRated);

  return (
    <>
      <Box
        sx={{
          px: 4,
          pt: 2,
          pb: 4,
        }}
      >
        <h3 className="text-xl font-bold">購入完了</h3>
        <p className="pt-2">
          商品データは
          <Link
            href="/purchase-history"
            className="text-blue-500 hover:underline"
          >
            購入履歴ページ
          </Link>
          からダウンロードいただけます
        </p>
      </Box>
      <Box sx={{ mb: 4 }}>
        {uniqUsers.map((user) => (
          <Box key={user.id}>
            <Box
              sx={{
                display: "flex",
                borderTop: "1px solid #e0e0e0",
                px: 4,
                py: 2,
                // mt: 2,
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
                <FollowButton
                  username={user.username}
                  is_following={user.followers.length > 0}
                />
              </Box>
            </Box>
            {user.products.map((item) => (
              <Box
                key={item.product.id}
                sx={{ borderBottom: "1px solid #e0e0e0" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // borderBottom: "1px solid #e0e0e0",
                    px: 4,
                    pt: 2,
                  }}
                >
                  <Box sx={{ width: 100, height: 100, mr: 4 }}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${item.product.thumbnail_link}`}
                      width={100}
                      height={100}
                      priority
                      className="h-full rounded-lg object-cover"
                      alt="商品のサムネイル画像"
                    />
                  </Box>
                  <Box>
                    <p className="text-xl font-bold">{item.product.name}</p>
                    <p className="text-lg text-red-500 font-bold">
                      {isNaN(parseInt(item.product.price))
                        ? "価格未設定"
                        : parseInt(item.product.price).toLocaleString("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                          })}
                    </p>
                  </Box>
                </Box>
                <Box sx={{ my: 2 }}>
                  {isRated[item.product.id] ? (
                    <>
                      <p className="text-center">評価が送信されました</p>
                    </>
                  ) : (
                    <>
                      <p className="text-center">
                        この商品を評価してみませんか？
                      </p>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          columnGap: "1em",
                        }}
                      >
                        <Rating
                          id={user.id}
                          name={`rating-${item.product.id}`}
                          defaultValue={0}
                          precision={0.5}
                          icon={<StarRateRounded fontSize="inherit" />}
                          emptyIcon={<StarRateRounded fontSize="inherit" />}
                          sx={{ fontSize: "3em" }}
                          onChange={(e, newValue) => {
                            ratingProduct(item.product.id, newValue);
                            setIsRated({
                              ...isRated,
                              [item.product.id]: true,
                            });
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Step3;
