"use client";

import { useContext, useState, createContext } from "react";

export const TabContext = createContext({
  activeTab: 0,
  setActiveTab: () => {},
  tabContents: [],
});

export const useTabContext = () => {
  return useContext(TabContext);
};

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    "最新の投稿",
    "フォロー中",
    // "VR",
    "3Dモデル",
    "神絵",
    // "Live",
  ];

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, tabContents }}>
      {children}
    </TabContext.Provider>
  );
};
