"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, ThemeProvider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";
import { useUserContext } from "@/context/UserContext";
// import {
//   NotificationsProvider,
//   useNotifications,
// } from "@toolpad/core/useNotifications";
import Post from "@/components/Post";
import PostCard from "@/components/PostCard";
import { fetchHeaders } from "@/config/fetchConfig";
import CircularLoading from "@/components/loading/CircularLoading";
import Link from "next/link";
import { urlForImage } from "@/utils/utils";
import { formatPrice } from "@/utils/formatPrice";

const CartPage = () => {
  const { activeUser, cartItems, fetchUserCart } = useUserContext();
  const [amount, setAmount] = useState(0);
  const { push } = useRouter();
  // const notifications = useNotifications();
  // console.log("cartItems", cartItems);

  useEffect(() => {
    if (cartItems) {
      setAmount(
        cartItems.reduce(
          (acc, item) => acc + item.product.price_histories[0].price,
          0
        )
      );
    }
  }, [cartItems]);

  const removeCartItem = async (cartItemId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/carts/items`,
        {
          method: "DELETE",
          headers: fetchHeaders,
          body: JSON.stringify({ cartItemId }),
          credentials: "include",
        }
      );

      const resJson = await response.json();

      if (resJson.success) {
        fetchUserCart();
        // notifications.show("商品をカートから削除しました", {
        //   severity: "success",
        //   autoHideDuration: 3000,
        // });
      } else {
        // notifications.show("商品のカート削除に失敗しました", {
        //   severity: "error",
        //   autoHideDuration: 3000,
        // });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeUser === false) {
      push("/");
    }
  }, [activeUser, push]);

  if (!cartItems) {
    return (
      <>
        <MainColumnHeader>
          <h3 className="font-bold tracking-wider">カート</h3>
        </MainColumnHeader>
        <CircularLoading />
      </>
    );
  }

  return (
    // <NotificationsProvider>
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">カート</h3>
      </MainColumnHeader>

      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Box key={item.id}>
            <Box className="flex items-center justify-end pr-4 pt-4">
              <span
                className="cursor-pointer hover:underline"
                onClick={removeCartItem.bind(null, item.id)}
              >
                カートから商品を削除
              </span>
              <IconButton>
                <CancelIcon onClick={removeCartItem.bind(null, item.id)} />
              </IconButton>
            </Box>
            <Link href={`/posts/${item.product.post.id}`}>
              <PostCard
                key={item.id}
                created_at={item.created_at}
                image_link={urlForImage(item.product.thumbnail_link, "images")}
                sellerName={
                  item.product.post.author.nickname ||
                  item.product.post.author.username
                }
                sellerIcon={urlForImage(item.product.post.author.icon_link)}
                productName={item.product.name}
                is_superuser={item.product.post.author.is_superuser}
              >
                <h2 className="text-[1.15em] ml-1 truncate">
                  {item.product.name}
                </h2>
                <p className="ml-1 mb-2 text-red-500 font-bold">
                  {formatPrice(item.product.price_histories[0].price)}
                </p>
                <p className="text-[1em] ml-1 truncate">
                  {item.product.post.content}
                </p>
              </PostCard>
            </Link>
          </Box>
        ))
      ) : (
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <h3 className="text-2xl font-bold text-gray-400">
            カートに商品がありません
          </h3>
        </Box>
      )}
      {cartItems && cartItems.length > 0 && (
        <Box
          sx={{
            borderTop: "1px solid #f0f0f0",
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 2,
          }}
        >
          <p className="font-bold text-xl">
            合計&nbsp;
            <span className="text-red-500">{formatPrice(amount)}</span>
          </p>
          <Button variant="contained" href="/purchase">
            購入する
          </Button>
          <Link
            href="/"
            className="text-blue-500 hover:underline"
            scroll={false}
          >
            &lt; 他の商品も見る &gt;
          </Link>
        </Box>
      )}
    </ThemeProvider>
    // </NotificationsProvider>
  );
};

export default CartPage;
