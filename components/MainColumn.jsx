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

const MainColumn = () => {
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

  const tabContents = ["最新の投稿", "フォロー中", "商品"].concat(
    pinnedTags || []
  );

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
        {activeUser ? (
          <>
            <FloatingPostButton />

            <TabContext value={tabIndex}>
              <TabList
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="Timeline tabs list"
                sx={{
                  // mx: 3,
                  backgroundColor: "white",
                  borderBottom: "1px solid #e0e0e0",
                  position: "sticky",
                  top: {
                    xs: "var(--height-header)",
                    sm: 0,
                  },
                  transition: "opacity 0.25s",
                  opacity: { xs: isTabBarTransparent ? 0.5 : 1, sm: 1 },
                  zIndex: 21,
                }}
                // className="shadow-md"
              >
                {tabContents.map((tabName, index) => (
                  <Tab key={index} label={tabName} value={index} />
                ))}
              </TabList>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <PostForm setRefresh={setRefresh} />
              </Box>
              {tabContents.map((tabName, index) => (
                <TabPanel
                  key={index}
                  value={index}
                  // keepMounted
                  sx={{ p: 0, mx: 0 }}
                >
                  {/* <Suspense
                    fallback={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 8,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    }
                  > */}
                  <Timeline
                    key={index}
                    name={tabName}
                    isActive={tabIndex === index}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    loggedIn={!!activeUser}
                  />
                  {/* </Suspense> */}
                </TabPanel>
              ))}
            </TabContext>
          </>
        ) : (
          <Box>
            <Timeline name="最新の投稿" isActive={true} />
          </Box>
        )}
      </NotificationsProvider>
    </>
  );
};

export default MainColumn;
