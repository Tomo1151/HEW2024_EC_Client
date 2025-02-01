"use client";

import React, { useEffect, useState } from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import Post from "@/components/Post";
import PostDetail from "@/components/PostDetail";
import ReplyForm from "@/components/ReplyForm";
import MainColumnHeader from "@/components/MainColumnHeader";
import { Box } from "@mui/material";
import CircularLoading from "@/components/loading/CircularLoading";
import ProductDetail from "@/components/ProductDetail";

const PostDetailPage = (route) => {
  /** @TODO
   *   ポストがリプの場合，リプ元のポストにぶら下がる形で表示する
   *   not foundの場合の表示を作成
   */
  const [postData, setPostData] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  const fetchPostById = async (postId) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}`,
        {
          credentials: "include",
        }
      );
      const resJson = await response.json();

      if (response.status === 404) {
        setPostData(null);
      }

      if (resJson.success) {
        const posts = resJson.data;
        setPostData(posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPostById(route.params.postId);
    })();
  }, [refresh]);

  useEffect(() => {
    const id =
      window && window.location.hash
        ? window && window.location.hash.substring(1)
        : window.innerWidth < 650
          ? "mobile_header"
          : "root";
    if (!id) return;

    const element = document.getElementById(id);
    if (!element) return;
    element?.scrollIntoView({ behavior: "smooth" });
  }, [postData]);

  if (postData === null) {
    return <div>Post not found</div>;
  }

  if (!postData) {
    return <CircularLoading />;
  }

  return (
    <NotificationsProvider>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">ポスト</h3>
      </MainColumnHeader>
      <Box>
        {postData.product ? (
          <ProductDetail
            type="detail"
            postId={postData.id}
            username={postData.author.username}
            nickname={postData.author.nickname}
            icon_link={postData.author.icon_link}
            content={postData.content}
            images={postData.images}
            live_link={postData.live_link}
            tags={postData.tags?.map((tagObj) => tagObj.tag.name)}
            productId={postData.product.id}
            name={postData.product.name}
            rating={postData.product.rating}
            price={postData.product.price_histories[0]?.price}
            comment_count={postData.comment_count}
            ref_count={postData.ref_count}
            like_count={postData.like_count}
            quote_count={postData.quote_count}
            quoted_ref={postData.quoted_ref}
            created_at={postData.created_at}
            is_reposted={postData.reposts.length > 0}
            is_liked={postData.likes.length > 0}
            is_clickable={false}
            setPosts={null}
            setRefresh={null}
          />
        ) : (
          <PostDetail
            type="post"
            postId={postData.id}
            username={postData.author.username}
            nickname={postData.author.nickname}
            icon_link={postData.author.icon_link}
            content={postData.content}
            images={postData.images}
            tags={postData.tags?.map((tagObj) => tagObj.tag.name)}
            comment_count={postData.comment_count}
            ref_count={postData.ref_count}
            like_count={postData.like_count}
            quote_count={postData.quote_count}
            quoted_ref={postData.quoted_ref}
            created_at={postData.created_at}
            is_reposted={postData.reposts.length > 0}
            is_liked={postData.likes.length > 0}
            is_clickable={false}
            setPosts={null}
            setRefresh={null}
          />
        )}

        <ReplyForm postId={postData.id} setRefresh={setRefresh} />
        {postData.replies.map((reply) => (
          <Post
            key={reply.id}
            type="reply"
            postId={reply.id}
            username={reply.author.username}
            nickname={reply.author.nickname}
            icon_link={reply.author.icon_link}
            content={reply.content}
            images={reply.images}
            comment_count={reply.comment_count}
            ref_count={reply.ref_count}
            like_count={reply.like_count}
            quote_count={reply.quote_count}
            quoted_ref={reply.quoted_ref}
            created_at={reply.created_at}
            is_reposted={reply.reposts.length > 0}
            is_liked={reply.likes.length > 0}
            is_clickable={true}
            setPosts={null}
            setRefresh={setRefresh}
          />
        ))}
      </Box>
    </NotificationsProvider>
  );
};

export default PostDetailPage;
