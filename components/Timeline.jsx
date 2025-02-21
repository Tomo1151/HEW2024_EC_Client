import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Post from "@/components/Post";
import Product from "@/components/Product";
import { useUserContext } from "@/context/UserContext";
import CircularLoading from "./loading/CircularLoading";
import InfiniteScroll from "react-infinite-scroller";
import PullToRefresh from "react-simple-pull-to-refresh";
import MainColumnHeader from "./MainColumnHeader";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import { Box } from "@mui/material";

const Timeline = ({
  name,
  isActive,
  setRefresh,
  refresh,
  live,
  loggedIn,
  type,
}) => {
  const { refreshToken } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostFetching, setIsPostFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // console.log({ name, isActive, setRefresh, refresh });
  // console.log(posts);
  // console.log({ name, type });

  const fetchPosts = async () => {
    try {
      if (!isActive || isPostFetching || type === undefined) return;
      setIsPostFetching(true);
      await refreshToken();
      const query = {
        tagName: name,
        after: posts.length > 0 ? posts[0].id : "",
      };

      if (live) query.live = true;
      if (type) query.type = type;

      const params = new URLSearchParams(query);
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/posts?" + params,
        {
          credentials: "include",
        }
      );
      const resJson = await response.json();
      setIsPostFetching(false);

      // console.log(`FETCH: ${name}`);

      if (resJson.success) {
        const newPosts = resJson.data;
        // console.log(newPosts);
        setIsLoading(false);
        setIsPostFetching(false);
        setHasMore(resJson.data.length === 10);
        if (resJson.data.length > 0) {
          setPosts(newPosts.concat(posts));
          // setPosts(posts.concat(newPosts));
          // if (setRefresh) setRefresh((prev) => !prev); // uncommenting this line to trigger refresh
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOldPosts = async () => {
    try {
      if (!isActive || isPostFetching || type === undefined) return;

      setIsPostFetching(true);
      await refreshToken();
      const query = {
        tagName: name,
        before: posts.length > 0 ? posts[posts.length - 1].id : "", // corrected index to fetch before post
      };

      if (live) query.live = true;
      if (type) query.type = type;

      const params = new URLSearchParams(query);
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/posts?" + params,
        {
          credentials: "include",
        }
      );
      const resJson = await response.json();
      setIsPostFetching(false);

      // console.log(`FETCH: ${name}`);

      if (resJson.success) {
        const oldPosts = resJson.data;

        setIsLoading(false);
        setIsPostFetching(false);
        // console.log(resJson.data, resJson.data.length === 10);
        setHasMore(resJson.data.length === 10);

        if (resJson.data.length > 0) {
          setPosts(posts.concat(oldPosts));
          // setPosts(oldPosts.concat(posts));
          // if (setRefresh) setRefresh((prev) => !prev);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // (async () => {
    if (!isActive) return;
    fetchPosts();
    // })();
  }, [isActive, refresh]);

  if (isLoading) {
    return <CircularLoading />;
  }

  if (!isLoading && posts.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <h3 className="text-2xl font-bold text-gray-400">
          ポストはまだありません
        </h3>
      </Box>
    );
  }

  // console.log(!isPostFetching, hasMore, !isPostFetching && hasMore);
  return (
    <>
      {live ? (
        <MainColumnHeader>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LiveTvRoundedIcon sx={{ fontSize: 30, pb: 0.25, mr: 1 }} />
            <h3 className="font-bold tracking-wider">ライブ配信</h3>
          </Box>
        </MainColumnHeader>
      ) : (
        loggedIn && (
          <LoadingButton
            variant="contained"
            onClick={fetchPosts}
            fullWidth
            loading={isPostFetching}
            sx={{
              display: {
                xs: "none",
                sm: "inline-flex",
              },
              boxShadow: "none",
              ":hover": { boxShadow: "none" },
              borderRadius: 0,
            }}
          >
            最新の投稿を読み込む
          </LoadingButton>
        )
      )}
      <PullToRefresh
        onRefresh={fetchPosts}
        refreshingContent={<CircularLoading />}
        pullingContent={<CircularLoading />}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchOldPosts}
          hasMore={hasMore}
          loader={<CircularLoading key={0} />}
          threshold={50}
          // initialLoad={false}
          // useWindow={false}
        >
          {posts
            // .toReversed()
            .map((post) =>
              post.product ? (
                <Product
                  key={post.id}
                  id={post.id}
                  type={post.type}
                  repost_user={post?.repost_user || undefined}
                  postId={post?.postId || post.id}
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
                  tags={post.tags?.map((tagObj) => tagObj.tag.name)}
                  live_link={post.live_link}
                  comment_count={post.comment_count}
                  ref_count={post.ref_count}
                  like_count={post.like_count}
                  quote_count={post.quote_count}
                  quoted_ref={post.quoted_ref}
                  created_at={post.created_at}
                  is_reposted={post.reposts.length > 0}
                  is_liked={post.likes.length > 0}
                  is_clickable={true}
                  setPosts={setPosts}
                  setRefresh={setRefresh}
                />
              ) : (
                <Post
                  key={post.id}
                  type={post.type}
                  repost_user={post?.repost_user || undefined}
                  postId={post?.postId || post.id}
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
                  created_at={
                    post.type === "repost"
                      ? post.postCreatedAt
                      : post.created_at
                  }
                  is_reposted={post.reposts.length > 0}
                  is_liked={post.likes.length > 0}
                  setPosts={setPosts}
                  setRefresh={setRefresh}
                />
              )
            )}
        </InfiniteScroll>
      </PullToRefresh>
    </>
  );
};

export default Timeline;
