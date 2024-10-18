"use client";

import { useTabContext } from "@/context/TabContext";

import Timeline from "./Timeline";

const TimelineContainer = () => {
  const { activeTab, tabContents } = useTabContext();
  console.log(activeTab, tabContents);

  return (
    <>
      {tabContents.map((name, idx) => (
        <Timeline key={idx} name={name} isActive={idx === activeTab} />
      ))}
    </>
  );
};

export default TimelineContainer;
