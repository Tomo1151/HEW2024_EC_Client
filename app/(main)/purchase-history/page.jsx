"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import InfiniteScroll from "react-infinite-scroller";
import PostCard from "@/components/PostCard";
import MainColumnHeader from "@/components/MainColumnHeader";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box, Button } from "@mui/material";

import { useUserContext } from "@/context/UserContext";
import { urlForImage } from "@/utils/utils";
import { fetchHeaders } from "@/config/fetchConfig";
import { formatPrice } from "@/utils/formatPrice";

export default function PurchaseHistoryPage() {
  const { refreshToken } = useUserContext();
  const [isPostFetching, setIsPostFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const aggrigatePurchaseHistory = (purchaseHistory) => {
    const result = purchaseHistory.reduce((acc, curr) => {
      const date = new Date(curr.created_at).toLocaleDateString("ja-JP");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});

    return result;
  };

  const fetchPurchaseHistory = async () => {
    if (isPostFetching || !hasMore) return;
    setIsPostFetching(true);
    refreshToken().then(async () => {
      const query = {
        before:
          purchaseHistory && purchaseHistory.length > 0
            ? purchaseHistory[purchaseHistory.length - 1].id
            : "",
      };

      const params = new URLSearchParams(query);

      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/purchase?" + params,
        {
          method: "GET",
          headers: fetchHeaders,
          credentials: "include",
        }
      );

      const resJson = await response.json();

      if (resJson.success) {
        setPurchaseHistory(purchaseHistory.concat(resJson.data));
        setHasMore(resJson.data.length === 10);
      }
    });
    setIsPostFetching(false);
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  if (purchaseHistory.length === 0 && !isPostFetching && !hasMore) {
    return (
      <>
        <MainColumnHeader className="font-bold tracking-wider">
          <h3>購入履歴</h3>
        </MainColumnHeader>
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <h3 className="text-2xl font-bold text-gray-400">
            購入履歴がありません
          </h3>
        </Box>
      </>
    );
  }

  return (
    <section className="bg-white">
      <MainColumnHeader className="font-bold tracking-wider">
        <h3>購入履歴</h3>
      </MainColumnHeader>
      <InfiniteScroll
        loadMore={fetchPurchaseHistory}
        hasMore={!isPostFetching && hasMore}
        loader={<CircularLoading key={0} />}
      >
        {Object.keys(aggrigatePurchaseHistory(purchaseHistory)).map(
          (key, i) => {
            return (
              <div key={i}>
                <h3 className="text-[1.25em] px-3 pt-4">{key}</h3>
                {aggrigatePurchaseHistory(purchaseHistory)[key].map(
                  (purchase) => (
                    <PostCard
                      key={purchase.id}
                      // created_at={purchase.created_at} //購入日付
                      image_link={urlForImage(
                        purchase.product.thumbnail_link,
                        "images"
                      )} //画像イメージ
                      post_link={`/posts/${purchase.product.post.id}`}
                      sellerName={purchase.product.post.author.username}
                      sellerIcon={urlForImage(
                        purchase.product.post.author.icon_link,
                        "icons"
                      )} //売り手のアイコン
                      productName={purchase.product.name} //売り物の名前
                      content={purchase.product.post.content} //売り物の詳細
                      is_superuser={purchase.product.post.author.is_superuser}
                    >
                      <h2 className="text-[1.15em] ml-1 truncate">
                        {purchase.product.name}
                      </h2>
                      <p className="ml-1 mb-2 text-red-500 font-bold">
                        {formatPrice(purchase.purchase_price)}
                      </p>
                      <p className="text-[1em] ml-1 truncate">
                        {purchase.product.post.content}
                      </p>
                      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ position: "relative", zIndex: 11 }}
                        >
                          <Link
                            href={`/purchase-history/rating?id=${purchase.product.id}`}
                          >
                            評価
                          </Link>
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ position: "relative", zIndex: 11 }}
                        >
                          <Link
                            href={`/purchase-history/download?id=${purchase.product.id}`}
                          >
                            ダウンロード
                          </Link>
                        </Button>
                      </Box>
                    </PostCard>
                  )
                )}
              </div>
            );
          }
        )}
      </InfiniteScroll>
    </section>
  );
}
