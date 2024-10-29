"use client";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Box, Tab, CircularProgress } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { lazy, Suspense } from "react";

import dynamic from "next/dynamic";
// const Timeline = dynamic(() => import("@/components/Timeline"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
const Timeline = lazy(() => import("@/components/Timeline"));

import PostForm from "@/components/PostForm";
import FloatingPostButton from "@/components/FloatingPostButton";

const MainColumn = () => {
  const { activeUser } = useAuthContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const tabContents = ["最新の投稿", "フォロー中", "VR", "神絵", "Live"];
  const handleTabChange = async (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
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
                mx: 3,
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 21,
              }}
              className="shadow-md"
            >
              {tabContents.map((tabName, index) => (
                <Tab key={index} label={tabName} value={index} />
              ))}
            </TabList>
            <PostForm setRefresh={setRefresh} />
            {tabContents.map((tabName, index) => (
              <TabPanel key={index} value={index} keepMounted>
                <Suspense fallback={<CircularProgress />}>
                  <Timeline
                    key={index}
                    name={tabName}
                    isActive={tabIndex === index}
                    refresh={refresh}
                  />
                </Suspense>
              </TabPanel>
            ))}
          </TabContext>
        </>
      ) : (
        <Box sx={{ mx: 3 }}>
          {/* <Timeline name="最新の投稿" isActive={true} /> */}
        </Box>
      )}
    </>
  );
};

export default MainColumn;
