"use client";

import { useState, useEffect } from "react";
import Post from "./Post";
import Product from "./Product";

import { Box } from "@mui/material";
import CircularLoading from "./loading/CircularLoading";

import { useUserContext } from "@/context/UserContext";
import InfiniteScroll from "react-infinite-scroller";

const QuoteTimeline = ({ quotedId, type, isActive }) => {
  const { refreshToken } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostFetching, setIsPostFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const messages = {
    posts: "投稿",
    products: "出品",
    likes: "いいねした投稿",
  };
  // console.log(user);

  const fetchPosts = async () => {
    try {
      if (!isActive) return;
      setIsPostFetching(true);
      refreshToken().then(async () => {
        const query = {
          type,
          before: posts.length > 0 ? posts[0].id : "",
        };
        const params = new URLSearchParams(query);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/posts/${quotedId}/quotes?${params}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        // console.log(`FETCH: ${user.username}/${endpoint}?${params}`);
        const resJson = await response.json();

        setIsPostFetching(false);
        setIsLoading(false);

        if (resJson.success) {
          const oldPosts = resJson.data;

          setIsLoading(false);
          setIsPostFetching(false);
          setHasMore(oldPosts.length === 10);

          setPosts(oldPosts.concat(posts));
        } else {
          setHasMore(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    fetchPosts();
  }, [isActive]);

  if (isLoading) {
    return <CircularLoading />;
  }

  if (!isPostFetching && posts.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <h3 className="text-2xl font-bold text-gray-400">
          引用はまだありません
        </h3>
      </Box>
    );
  }

  return (
    <Box>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchPosts}
        hasMore={hasMore}
        loader={<CircularLoading key={0} />}
      >
        {posts
          .toReversed()
          .map((post) =>
            post.product ? (
              <Product
                key={post.id}
                id={post.id}
                type={post.type}
                postId={post.id}
                username={post.author.username}
                nickname={post.author.nickname}
                is_superuser={post.author.is_superuser}
                icon_link={post.author.icon_link}
                content={post.content}
                productId={post.product.id}
                price={post.product.price_histories[0]?.price}
                name={post.product.name}
                rating={post.product.rating}
                images={post.images}
                live_link={post.live_link}
                tags={post.tags?.map((tagObj) => tagObj.tag.name)}
                comment_count={post.comment_count}
                ref_count={post.ref_count}
                like_count={post.like_count}
                quote_count={post.quote_count}
                quoted_ref={post.quoted_ref}
                created_at={post.created_at}
                is_reposted={post.reposts.length > 0}
              />
            ) : (
              <Post
                key={post.id}
                type={post.type}
                postId={post.id}
                username={post.author.username}
                nickname={post.author.nickname}
                is_superuser={post.author.is_superuser}
                icon_link={post.author.icon_link}
                content={post.content}
                images={post.images}
                tags={post.tags?.map((tagObj) => tagObj.tag.name)}
                comment_count={post.comment_count}
                ref_count={post.ref_count}
                like_count={post.like_count}
                quote_count={post.quote_count}
                quoted_ref={post.quoted_ref}
                created_at={post.created_at}
                is_reposted={post.reposts.length > 0}
              />
            )
          )}
      </InfiniteScroll>
    </Box>
  );
};

export default QuoteTimeline;
