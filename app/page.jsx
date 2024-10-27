"use client";

import PostForm from "@/components/PostForm";
import { useAuthContext } from "@/context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

import { Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { lazy, Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";
// const Timeline = dynamic(() => import("@/components/Timeline"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
import TimelineLoading from "@/components/loading/TimelineLoading";
const Timeline = lazy(() => import("@/components/Timeline"));

export default function App() {
  const { activeUser } = useAuthContext();
  const [tabIndex, setTabIndex] = useState(0);
  const tabContents = ["最新の投稿", "フォロー中", "VR", "神絵", "Live"];
  const handleTabChange = async (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{
          ml: "3em",
        }}
      >
        {activeUser ? (
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
            <PostForm />
            <Suspense fallback={<TimelineLoading />}>
              {tabContents.map((tabName, index) => (
                <TabPanel key={index} value={index} keepMounted>
                  <Timeline
                    key={index}
                    name={tabName}
                    isActive={tabIndex === index}
                  />
                </TabPanel>
              ))}
            </Suspense>
          </TabContext>
        ) : (
          <Timeline name="最新の投稿" isActive={true} />
        )}
      </Container>
    </ThemeProvider>
  );
}
