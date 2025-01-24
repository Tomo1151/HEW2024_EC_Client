"use client";

import Link from "next/link";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import { Box, Skeleton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MainColumnHeader from "@/components/MainColumnHeader";
import { Suspense, useEffect, useState } from "react";
import { fetchHeaders } from "@/config/fetchConfig";
import CircularLoading from "@/components/loading/CircularLoading";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Rating from "@mui/material/Rating";

import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { useNotifications } from "@toolpad/core";

import { urlForImage } from "@/utils/utils";
import { formatPrice } from "@/utils/formatPrice";

const RatingPage = () => {
  return (
    <Suspense loading={<CircularLoading />}>
      <NotificationsProvider>
        <RatingPageContainer />
      </NotificationsProvider>
    </Suspense>
  );
};

const RatingPageContainer = () => {
  const notifications = useNotifications();

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/products/${productId}`,
        {
          method: "GET",
          headers: fetchHeaders,
          credentials: "include",
        }
      );
      const resJson = await response.json();
      console.log(resJson);
      if (resJson.success) {
        setProduct(resJson.data);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const ratingProduct = async (productId, rating) => {
    setIsSending(true);
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
        notifications.show("評価が正常に送信されました", {
          severity: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show("正常に評価が送信されませんでした", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const [isSending, setIsSending] = useState(false);
  const params = useSearchParams().get("id");
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [rating, setRating] = useState(false);

  useEffect(() => {
    if (params) fetchProduct(params);
    setProductId(params);
    // console.log(params.id);
  }, [params]);

  if (!params) {
    return (
      <>
        <MainColumnHeader>
          <h3 className="font-bold tracking-wider">商品評価ページ</h3>
        </MainColumnHeader>
        <CircularLoading />
      </>
    );
  }

  return (
    <>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">商品評価ページ</h3>
      </MainColumnHeader>

      <Box sx={{ px: 4, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarRateRoundedIcon sx={{ fontSize: 32, mr: 1 }} />
          <h2 className="text-2xl font-bold">商品評価ページ</h2>
        </Box>
        <p className="text-gray-500 mt-4">購入した商品を評価しましょう！</p>

        <Box
          sx={{
            display: "flex",
            // borderBottom: "1px solid #e0e0e0",
            px: { xs: 1, sm: 4 },
            pt: 2,
            mb: 2,
            columnGap: { xs: 1, sm: 2 },
          }}
        >
          {product === null ? (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={100}
                sx={{ flexShrink: 0 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: "1.25em" }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  sx={{ fontSize: "1.15em" }}
                />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
                <Image
                  src={urlForImage(product.thumbnail_link, "images")}
                  width={100}
                  height={100}
                  priority
                  className="h-full rounded-lg object-cover"
                  alt="商品のサムネイル画像"
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <p className="text-[1.25em] font-bold">{product.name}</p>
                <p className="text-[1.15em] text-red-500 font-bold">
                  {formatPrice(product.price_histories[0].price)}
                </p>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            name={`rating-${productId}`}
            defaultValue={0}
            precision={0.5}
            icon={<StarRateRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
            sx={{ fontSize: "3em" }}
            onChange={(e, newValue) => {
              setRating(newValue);
            }}
          />

          <Link href="/">
            <LoadingButton
              variant="outlined"
              sx={{ mt: 4 }}
              loading={isSending || product === null}
              onClick={async () => {
                if (!rating) return;
                await ratingProduct(productId, rating);
              }}
            >
              評価を送信してトップへ
            </LoadingButton>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default RatingPage;
