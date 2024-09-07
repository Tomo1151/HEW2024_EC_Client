"use client";

import { useTabContext } from "@/context/TabContext";

const Timeline = () => {
  const { activeTab, tabContents } = useTabContext();

  return (
    <>
      <h2>Timeline</h2>
      <p>content: {tabContents[activeTab]}</p>
    </>
  );
};

export default Timeline;
