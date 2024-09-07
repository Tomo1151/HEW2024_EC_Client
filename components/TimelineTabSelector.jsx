"use client";

import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { useTabContext } from "@/context/TabContext";

import TimelineTab from "./TimelineTab";

const TimelineTabSelector = () => {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const { activeTab, setActiveTab, tabContents } = useTabContext();

  return (
    <div
      className="flex justify-around mb-4 border-b-[1px] overflow-x-auto hidden-scrollbar"
      ref={ref}
      {...events}
    >
      {tabContents.map((tabName, index) => (
        <TimelineTab
          key={index}
          tabName={tabName}
          isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        />
      ))}
      {/* <TimelineTab tabName="最新の投稿" isActive={true} onClick={() => {}} />
      <TimelineTab tabName="フォロー中" isActive={false} onClick={() => {}} />
      <TimelineTab tabName="VR" isActive={false} onClick={() => {}} />
      <TimelineTab tabName="3Dモデル" isActive={false} onClick={() => {}} />
      <TimelineTab tabName="神絵" isActive={false} onClick={() => {}} />
      <TimelineTab tabName="Live" isActive={false} onClick={() => {}} /> */}
    </div>
  );
};

export default TimelineTabSelector;
