import { useRouter } from "next/navigation";

import { Box } from "@mui/material";
import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  RepeatRounded,
} from "@mui/icons-material";

import { useAuthContext } from "@/context/AuthContext";
import { fetchHeaders } from "@/config/fetchConfig";
import Link from "next/link";

const PostReaction = ({
  postId,
  comment_count,
  ref_count,
  setRepostCount,
  is_reposted,
  setReposted,
  like_count,
  setLikeCount,
  setLiked,
  is_liked,
  is_preview,
  setPosts,
  setRefresh,
}) => {
  const { activeUser, refreshToken } = useAuthContext();
  const router = useRouter();

  const reaction = {
    repost: {
      method: is_reposted ? "DELETE" : "POST",
      count: is_reposted ? -1 : 1,
      setState: setReposted,
      setCount: setRepostCount,
    },
    like: {
      method: is_liked ? "DELETE" : "POST",
      count: is_liked ? -1 : 1,
      setState: setLiked,
      setCount: setLikeCount,
    },
  };

  const handleReaction = async (type) => {
    if (is_preview) return;
    if (!activeUser) {
      router.push("/login", { scroll: false });
      return;
    }

    console.log(type);

    try {
      refreshToken().then(async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}/${type}`,
          {
            method: reaction[type].method,
            headers: fetchHeaders,
            credentials: "include",
          }
        );
        reaction[type].setState((prev) => !prev);
        reaction[type].setCount((prev) => prev + reaction[type].count);
        const resJson = await response.json();

        if (resJson.success) {
          if (type === "like") {
            if (setPosts)
              setPosts((prev) => {
                console.log(prev);
                console.log(
                  prev.map((post) => {
                    if (
                      post.id === resJson.data.ref.id ||
                      post.postId === resJson.data.ref.id
                    ) {
                      return {
                        ...post,
                        like_count: resJson.data.ref.like_count,
                        likes: resJson.data.ref.likes,
                      };
                    }
                    return post;
                  })
                );
                return prev.map((post) => {
                  if (
                    post.id === resJson.data.ref.id ||
                    post.postId === resJson.data.ref.id
                  ) {
                    return {
                      ...post,
                      like_count: resJson.data.ref.like_count,
                      likes: resJson.data.ref.likes,
                    };
                  }
                  return post;
                });
              });
          }

          if (type === "repost" && is_reposted) {
            if (setPosts)
              setPosts((prev) =>
                prev
                  .filter(
                    (post) =>
                      !(
                        post.postId === postId &&
                        post.repost_user.id === activeUser.id
                      )
                  )
                  .map((post) => {
                    if (
                      post.id === resJson.data.ref.id ||
                      post.postId === resJson.data.ref.id
                    ) {
                      return resJson.data.ref;
                    }
                    return post;
                  })
              );
          } else if (type === "repost" && !is_reposted) {
            if (setPosts)
              setPosts((prev) =>
                prev.map((post) => {
                  if (
                    post.id === resJson.data.ref.id ||
                    post.postId === resJson.data.ref.id
                  ) {
                    return resJson.data.ref;
                  }
                  return post;
                })
              );
          }

          if (setRefresh) setRefresh((prev) => !prev);
        }
        // if (type === "repost" && setPosts) {
        // if (is_reposted) {
        //   console.log(
        //     "set posts (d): ",
        //     posts
        //       // .filter(
        //       //   (post) =>
        //       //     !(
        //       //       post.postId === postId &&
        //       //       post.repost_user.id === activeUser.id
        //       //     )
        //       // )
        //       .map((post) => {
        //         if (post.id === postId || post.postId === postId) {
        //           return {
        //             ...post,
        //             ref_count: post.ref_count - 1,
        //             reposts: post.reposts.filter(
        //               (repost) => repost.userId !== activeUser.id
        //             ),
        //           };
        //         }
        //         return post;
        //       })
        //   );
        //   setPosts(
        //     posts
        //       .filter(
        //         (post) =>
        //           !(
        //             post.postId === postId &&
        //             post.repost_user.id === activeUser.id
        //           )
        //       )
        //       .map((post) => {
        //         if (post.id === postId || post.postId === postId) {
        //           return {
        //             ...post,
        //             ref_count: post.ref_count - 1,
        //             reposts: post.reposts.filter(
        //               (repost) => repost.userId !== activeUser.id
        //             ),
        //           };
        //         }
        //         return post;
        //       })
        //   );
        // } else {
        //   console.log(
        //     "set posts (a): ",
        //     posts.map((post) => {
        //       if (post.id === postId || post.postId === postId) {
        //         return {
        //           ...post,
        //           ref_count: post.ref_count + 1,
        //           reposts: [{ userId: activeUser.id }, ...post.reposts],
        //         };
        //       }
        //       return post;
        //     })
        //   );
        //   setPosts(
        //     posts.map((post) => {
        //       if (post.id === postId || post.postId === postId) {
        //         return {
        //           ...post,
        //           ref_count: post.ref_count + 1,
        //           reposts: [{ userId: activeUser.id }, ...post.reposts],
        //         };
        //       }
        //       return post;
        //     })
        //   );
        // if (setRefresh) setRefresh((prev) => !prev);
        // }
        // }

        // console.log(posts);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        pt: "1em",
        columnGap: "8em",
      }}
    >
      <Box
        sx={{
          fontSize: "1.15em",
          userSelect: "none",
          transitionDuration: "0.15s",
          zIndex: 20,
          "&:hover": {
            color: "#68b5ff",
            filter: "drop-shadow(0 0 0.5rem #68b5ff)",
            cursor: "pointer",
          },
        }}
      >
        {is_preview ? (
          <>
            <ChatBubbleOutlineRounded sx={{ fontSize: "1.25em", mr: ".5em" }} />
            {comment_count || 0}
          </>
        ) : (
          <Link href={`/posts/${postId}`} className="z-0" scroll={false}>
            <Box component="span" sx={{ display: "inline-block" }}>
              <ChatBubbleOutlineRounded
                sx={{ fontSize: "1.25em", mr: ".5em" }}
              />
              {comment_count || 0}
            </Box>
          </Link>
        )}
      </Box>
      <Box
        sx={[
          {
            fontSize: "1.15em",
            userSelect: "none",
            transitionDuration: "0.15s",
            zIndex: 20,
            "&:hover": {
              color: "#2dcb2d",
              filter: "drop-shadow(0 0 0.5rem #2dcb2d)",
              cursor: "pointer",
            },
          },
          is_reposted && {
            color: "#2dcb2d",
          },
        ]}
        onClick={handleReaction.bind(null, "repost")}
      >
        <RepeatRounded sx={{ fontSize: "1.25em", mr: ".5em", mb: ".0875em" }} />
        {ref_count || 0}
      </Box>
      <Box
        sx={[
          {
            fontSize: "1.15em",
            userSelect: "none",
            transitionDuration: "0.15s",
            zIndex: 20,
            "&:hover": {
              color: "red",
              filter: "drop-shadow(0 0 0.5rem red)",
              cursor: "pointer",
            },
          },
          is_liked && { color: "red" },
        ]}
        onClick={handleReaction.bind(null, "like")}
      >
        {is_liked ? (
          <FavoriteRounded
            sx={{ fontSize: "1.25em", mr: ".5em", mb: ".0875em" }}
          />
        ) : (
          <FavoriteBorderRounded
            sx={{ fontSize: "1.25em", mr: ".5em", mb: ".0875" }}
          />
        )}
        {like_count}
      </Box>
    </Box>
  );
};

export default PostReaction;
