"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { lazy, Suspense } from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

const Timeline = lazy(() => import("@/components/Timeline"));

import PostForm from "@/components/PostForm";
import FloatingPostButton from "@/components/FloatingPostButton";

const HEADER_SCROLL_THRESHOLD = 360;

const LivePage = () => {
  const { activeUser } = useUserContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isTabBarTransparent, setIsTabBarTransparent] = useState(false);

  let pinnedTags = [];
  try {
    if (typeof window !== "undefined")
      pinnedTags = JSON.parse(localStorage.getItem("pinnedTag"));
  } catch (error) {
    console.error(error);
  }

  const tabContents = ["最新の投稿", "フォロー中"].concat(pinnedTags);

  const handleTabChange = async (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleScroll = () => {
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      setIsTabBarTransparent(true);
    } else {
      setIsTabBarTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NotificationsProvider>
        <Box>
          <Timeline name="最新の投稿" isActive={true} live />
        </Box>
      </NotificationsProvider>
    </>
  );
};

export default LivePage;
