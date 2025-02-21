"use client";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { lazy, Suspense } from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

const Timeline = lazy(() => import("@/components/Timeline"));

const LivePage = () => {
  return (
    <>
      <NotificationsProvider>
        <Box>
          <Timeline name="最新の投稿" isActive={true} live type={null} />
        </Box>
      </NotificationsProvider>
    </>
  );
};

export default LivePage;
