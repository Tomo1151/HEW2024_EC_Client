"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { postId } = params;
  console.log(postId);
  const router = useRouter();
  useEffect(() => {
    router.replace(`/posts/${postId}`);
    window.location.href = `/posts/${postId}`;
  }, []);

  return null;
};

export default Page;
