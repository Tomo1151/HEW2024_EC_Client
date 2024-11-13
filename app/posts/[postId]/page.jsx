"use client";

import React, { useEffect, useState } from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import Post from "@/components/Post";
import ReplyForm from "@/components/ReplyForm";

const PostDetail = (route) => {
  const [postData, setPostData] = useState(null);
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

      console.log(`FETCH: ${name}`);

      if (resJson.success) {
        const posts = resJson.data;
        console.dir(posts);
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

  return (
    <NotificationsProvider>
      {postData && (
        <>
          <Post
            type="post"
            postId={postData.id}
            username={postData.author.username}
            nickname={postData.author.nickname}
            icon_link={postData.author.icon_link}
            content={postData.content}
            image_link={postData.image_link}
            comment_count={postData.comment_count}
            ref_count={postData.ref_count}
            like_count={postData.like_count}
            created_at={postData.created_at}
            is_reposted={postData.reposts.length > 0}
            is_liked={postData.likes.length > 0}
            is_clickable={false}
            setPosts={null}
            setRefresh={null}
          />
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
              image_link={reply.image_link}
              comment_count={reply.comment_count}
              ref_count={reply.ref_count}
              like_count={reply.like_count}
              created_at={reply.created_at}
              is_reposted={reply.reposts.length > 0}
              is_liked={reply.likes.length > 0}
              is_clickable={true}
              setPosts={null}
              setRefresh={null}
            />
          ))}
        </>
      )}
    </NotificationsProvider>
  );
};

export default PostDetail;
