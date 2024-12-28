"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import InfiniteScroll from "react-infinite-scroller";
import PostCard from "@/components/PostCard";
import MainColumnHeader from "@/components/MainColumnHeader";
import CircularLoading from "@/components/loading/CircularLoading";

import { useUserContext } from "@/context/UserContext";

import { fetchHeaders } from "@/config/fetchConfig";

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
      // console.log(resJson);

      if (resJson.success) {
        // console.log(aggrigatePurchaseHistory(resJson.data));
        setPurchaseHistory(purchaseHistory.concat(resJson.data));
        setHasMore(resJson.data.length === 10);
      }
    });
    setIsPostFetching(false);
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  return (
    <section className="bg-white">
      <MainColumnHeader className="font-bold tracking-wider">
        <h3>購入履歴</h3>
      </MainColumnHeader>
      <InfiniteScroll
        loadMore={fetchPurchaseHistory}
        hasMore={hasMore}
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
                      image_link={
                        purchase.product.thumbnail_link
                          ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${purchase.product.thumbnail_link}`
                          : "https://placeholder.com/150"
                      } //画像イメージ
                      post_link={`/posts/${purchase.product.post.id}`}
                      sellerName={purchase.product.post.author.username}
                      sellerIcon={
                        purchase.product.post.author.icon_link
                          ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${purchase.product.post.author.icon_link}`
                          : "https://placeholder.com/150"
                      } //売り手のアイコン
                      productName={purchase.product.name} //売り物の名前
                      content={purchase.product.post.content} //売り物の詳細
                    >
                      <h2 className="text-[1.15em] ml-1">
                        {purchase.product.name}
                      </h2>
                      <p className="ml-1 mb-2 text-red-500 font-bold">
                        {purchase.product.price.toLocaleString("ja-JP", {
                          style: "currency",
                          currency: "JPY",
                        })}
                      </p>
                      <p className="text-[1em] ml-1">
                        {purchase.product.post.content}
                      </p>
                    </PostCard>
                  )
                )}
              </div>
            );
          }
        )}
        {/* {purchaseHistory?.map((purchase) => (
          <PostCard
            key={purchase.id}
            created_at={purchase.created_at} //購入日付
            image_link={
              purchase.product.thumbnail_link
                ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${purchase.product.thumbnail_link}`
                : "https://placeholder.com/150"
            } //画像イメージ
            sellerName={purchase.product.post.author.username}
            sellerIcon={
              purchase.product.post.author.icon_link
                ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${purchase.product.post.author.icon_link}`
                : "https://placeholder.com/150"
            } //売り手のアイコン
            productName={purchase.product.name} //売り物の名前
            content={purchase.product.post.content} //売り物の詳細
          >
            <h2 className="text-[1.15em] ml-1">{purchase.product.name}</h2>
            <p className="ml-1 mb-2 text-red-500 font-bold">
              {purchase.product.price.toLocaleString("ja-JP", {
                style: "currency",
                currency: "JPY",
              })}
            </p>
            <p className="text-[1em] ml-1">{purchase.product.post.content}</p>
          </PostCard>
        ))} */}
      </InfiniteScroll>

      {/* {tentative.map((purchase, index) => (
        <PostCard
          key={index}
          created_at={purchase.created_at} //購入日付
          image_link={purchase.product.post.images[0].image_link} //画像イメージ
          sellerName={purchase.product.post.author.username} //売り手の名前
          sellerIcon={purchase.product.post.author.icon_link} //売り手のアイコン
          productName={purchase.product.name} //売り物の名前
          content={purchase.product.post.content} //売り物の詳細
        ></PostCard>
      ))} */}
    </section>
  );
}
