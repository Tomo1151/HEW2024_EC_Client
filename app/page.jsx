"use client";

import PostForm from "@/components/PostForm";
import { useAuthContext } from "@/context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

import {
  Box,
  Container,
  Tab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  CircularProgress,
} from "@mui/material";

import { EditNoteRounded, ColorLensRounded } from "@mui/icons-material";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";

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

  const actions = [
    {
      icon: <EditNoteRounded />,
      name: "投稿",
      onclick: () => console.log("Edit"),
    },
    {
      icon: <ColorLensRounded />,
      name: "作品投稿",
      onclick: () => console.log("Save"),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel="投稿ボタン"
        sx={{ position: "fixed", bottom: "5em", right: "7em", zIndex: 10 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
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
            {tabContents.map((tabName, index) => (
              <TabPanel key={index} value={index} keepMounted>
                <Suspense fallback={<CircularProgress />}>
                  <Timeline
                    key={index}
                    name={tabName}
                    isActive={tabIndex === index}
                  />
                </Suspense>
              </TabPanel>
            ))}
          </TabContext>
        ) : (
          <Box sx={{ mx: 3 }}>
            <Timeline name="最新の投稿" isActive={true} />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
