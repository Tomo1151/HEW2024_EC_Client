"use client";

import { useState, useEffect } from "react";
import Post from "./Post";

import CircularLoading from "./loading/CircularLoading";
import Product from "./Product";

const ProfileUserTimeline = ({ user }) => {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${user.username}/posts`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(response.status);
      }

      const resJson = await response.json();

      if (resJson.success) {
        setPosts(resJson.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      fetchPosts();
    })();
  }, []);

  if (!posts) {
    return <CircularLoading />;
  }

  return (
    <section>
      {posts.map((post) =>
        post.product ? (
          <Product
            key={post.id}
            type={post.type}
            postId={post.id}
            username={post.author.username}
            nickname={post.author.nickname}
            icon_link={post.author.icon_link}
            content={post.content}
            productId={post.product.id}
            price={post.product.price}
            name={post.product.name}
            images={post.images}
            comment_count={post.comment_count}
            ref_count={post.ref_count}
            like_count={post.like_count}
            created_at={post.created_at}
            is_reposted={post.reposts.length > 0}
            is_liked={post.likes.length > 0}
            setPosts={null}
            setRefresh={null}
          />
        ) : (
          <Post
            key={post.id}
            type={post.type}
            repost_user={post?.repost_user || undefined}
            postId={post?.postId || post.id}
            username={post.author.username}
            nickname={post.author.nickname}
            icon_link={post.author.icon_link}
            content={post.content}
            images={post.images}
            comment_count={post.comment_count}
            ref_count={post.ref_count}
            like_count={post.like_count}
            created_at={post.created_at}
            is_reposted={post.reposts.length > 0}
            is_liked={post.likes.length > 0}
            setPosts={null}
            setRefresh={null}
          />
        )
      )}
    </section>
  );
};

export default ProfileUserTimeline;
