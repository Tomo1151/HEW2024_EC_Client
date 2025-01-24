import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useUserContext } from "@/context/UserContext";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box, Button, Rating } from "@mui/material";
import FollowButton from "@/components/FollowButton";
import { StarRateRounded } from "@mui/icons-material";
import { urlForImage } from "@/utils/utils";

import { useNotifications } from "@toolpad/core";
import { formatPrice } from "@/utils/formatPrice";

const Step3 = () => {
  const notifications = useNotifications();
  const { cartItems, fetchUserCart, clearUserCart } = useUserContext();
  const [productRatings, setProductRatings] = useState(
    Object.fromEntries(cartItems.map((item) => [item.product.id, false]))
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [error, setError] = useState(null);

  const items = useRef([]);

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
        notifications.show("評価が送信されました", {
          severity: "success",
          autoHideDuration: 3000,
        });
      } else {
        notifications.show("評価が正常に送信されませんでした", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const purchaseItems = async () => {
    if (isCompleted) return;

    const products = cartItems.map((item) => ({
      productId: item.product.id,
      priceId: item.product.price_histories[0].id,
    }));

    // console.log(products);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("購入が正常に完了されませんでした");
      }

      const resJson = await response.json();
      if (resJson.success) {
        items.current = cartItems;
        // clearUserCart();
        notifications.show("購入が完了しました", {
          severity: "success",
          autoHideDuration: 3000,
        });
        setIsCompleted(true);
      }
    } catch (error) {
      setError(error);
      console.error(error);
      notifications.show("購入が正常に完了されませんでした", {
        severity: "error",
        autoHideDuration: 3000,
      });
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
        <p className="text-gray-500 text-center text-sm py-4">
          何度も発生する場合は
          <br />
          以下のリンクよりお問い合わせください
        </p>
        <Link
          href="/contact"
          className="text-blue-500 hover:underline"
          passHref
        >
          お問い合わせ
        </Link>
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
    const uniqueProducts = new Map();
    items.current.forEach((item) => {
      if (item.product.post.author.id === user.id) {
        uniqueProducts.set(item.product.id, item);
      }
    });
    uniqUsers[index].products = Array.from(uniqueProducts.values());
  });
  // console.log(productRatings);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          px: { xs: 1, sm: 4 },
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
      <Box sx={{ mb: 4, textAlign: "left" }}>
        {uniqUsers.map((user) => (
          <Box key={user.id}>
            <Box
              sx={{
                display: "flex",
                borderTop: "1px solid #e0e0e0",
                px: { xs: 0, sm: 4 },
                py: 2,
                columnGap: { xs: 1, sm: 2 },
                // mt: 2,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  // mr: { xs: 1, sm: 2 },
                  flexShrink: 0,
                }}
              >
                <Link
                  href={`/users/${user.username}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:brightness-[.85] rounded-full duration-200"
                >
                  <Image
                    src={urlForImage(user.icon_link)}
                    width={50}
                    height={50}
                    priority
                    className="w-full h-full rounded-full object-cover"
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
                  flexShrink: 0,
                }}
              >
                <FollowButton
                  username={user.username}
                  is_following={user.followers.length > 0}
                  sx={{ height: "fit-content" }}
                />
              </Box>
            </Box>
            {user.products.map((item, index) => (
              <Box
                key={item.product.id}
                sx={{ borderBottom: "1px solid #e0e0e0" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // borderBottom: "1px solid #e0e0e0",
                    px: { xs: 1, sm: 4 },
                    pt: 2,
                    columnGap: { xs: 1, sm: 2 },
                  }}
                >
                  <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
                    <Image
                      src={urlForImage(item.product.thumbnail_link, "images")}
                      width={100}
                      height={100}
                      priority
                      className="h-full rounded-lg object-cover"
                      alt="商品のサムネイル画像"
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <p className="text-[1.25em] font-bold">
                      {item.product.name}
                    </p>
                    <p className="text-[1.15em] text-red-500 font-bold">
                      {formatPrice(item.product.price_histories[0].price)}
                    </p>
                  </Box>
                </Box>
                <Box sx={{ my: 2 }}>
                  {productRatings[item.product.id] && false ? (
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
                            // console.log(newValue);
                            // ratingProduct(item.product.id, newValue);
                            setProductRatings({
                              ...productRatings,
                              [item.product.id]: newValue,
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

      {/* <Link href="/"> */}
      <Button
        variant="contained"
        color="primary"
        href="/"
        onClick={async () => {
          for (const [key, value] of Object.entries(productRatings)) {
            if (!value) continue;
            await ratingProduct(key, value);
          }
        }}
      >
        評価を送信してトップへ
      </Button>
      {/* </Link> */}
    </Box>
  );
};

export default Step3;
