"use client";

import { useEffect, useState, useRef } from "react";
import Post from "@/components/Post";
import Product from "@/components/Product";
import { useUserContext } from "@/context/UserContext";
import CircularLoading from "./loading/CircularLoading";
import InfiniteScroll from "react-infinite-scroller";
import { Box } from "@mui/material";
import FollowUserColumn from "./FollowUserColumn";

const SearchTimeline = ({ type, isSrcTagClick, q, isActive }) => {
  const { refreshToken } = useUserContext();
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostFetching, setIsPostFetching] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  // console.log("rendering SearchTimeline", type, isSrcTagClick, q, entries);

  const fetchEntry = async (before) => {
    try {
      if (!isActive) return;
      setIsPostFetching(true);
      refreshToken().then(async () => {
        // console.log(entries);
        const query = {
          type,
          tag: isSrcTagClick,
          q,
          before: entries.length > 0 ? entries[entries.length - 1].id : "",
        };

        const params = new URLSearchParams(query);
        const response = await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/search?" + params,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        const resJson = await response.json();
        setIsPostFetching(false);

        console.log(`FETCH: ${type}`);

        if (resJson.success) {
          const newEntries = resJson.data;

          setIsLoading(false);
          setIsPostFetching(false);
          setHasMore(resJson.length === 10);
          if (resJson.length > 0) {
            setEntries(entries.concat(newEntries));
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isActive) return;
      await fetchEntry();
    })();
  }, [isActive, q]);

  if (isLoading) {
    return <CircularLoading />;
  }

  // console.log(entries);

  if (!isPostFetching && entries.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <h3 className="text-2xl font-bold text-gray-400">
          "{q}"<wbr /> に一致する投稿が見つかりませんでした
        </h3>
      </Box>
    );
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchEntry}
      hasMore={hasMore}
      loader={<CircularLoading key={0} />}
      threshold={50}
    >
      {entries.map((entry) =>
        entry.type === "user" ? (
          <FollowUserColumn
            key={entry.id}
            username={entry.username}
            nickname={entry.nickname}
            bio={entry.bio}
            icon_link={entry.icon_link}
            is_following={entry.followers.length > 0}
          />
        ) : entry.product ? (
          <Product
            key={entry.id}
            type={entry.type}
            postId={entry.id}
            username={entry.author.username}
            nickname={entry.author.nickname}
            icon_link={entry.author.icon_link}
            content={entry.content}
            productId={entry.product.id}
            price={entry.product.price_histories[0].price}
            name={entry.product.name}
            images={entry.images}
            tags={entry.tags?.map((tagObj) => tagObj.tag.name)}
            comment_count={entry.comment_count}
            ref_count={entry.ref_count}
            like_count={entry.like_count}
            created_at={entry.created_at}
            is_reposted={entry.reposts.length > 0}
          />
        ) : (
          <Post
            key={entry.id}
            type={entry.type}
            postId={entry.id}
            username={entry.author.username}
            nickname={entry.author.nickname}
            icon_link={entry.author.icon_link}
            content={entry.content}
            images={entry.images}
            tags={entry.tags?.map((tagObj) => tagObj.tag.name)}
            comment_count={entry.comment_count}
            ref_count={entry.ref_count}
            like_count={entry.like_count}
            created_at={entry.created_at}
            is_reposted={entry.reposts.length > 0}
          />
        )
      )}
    </InfiniteScroll>
  );
};

export default SearchTimeline;
