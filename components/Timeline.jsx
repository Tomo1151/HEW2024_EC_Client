"use client";

import { useTabContext } from "@/context/TabContext";
import Post from "@/components/Post";

const Timeline = () => {
  const { activeTab, tabContents } = useTabContext();

  return (
    <>
      <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} />
    </>
  );
};

export default Timeline;
