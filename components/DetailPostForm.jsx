"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

import PostForm from "./PostForm";
import PostProductForm from "./PostProductForm";

const DetailPostForm = () => {
  const router = useRouter();
  const route = {
    post: 0,
    product: 1,
  };
  const [tabIndex, setTabIndex] = useState(
    route[useSearchParams().get("type")] || 0
  );

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    router.replace(`/post?type=${Object.keys(route)[newValue]}`);
  };

  return (
    <NotificationsProvider>
      <Box component="section">
        <TabContext value={tabIndex}>
          <Box>
            <TabList
              variant="fullWidth"
              onChange={handleTabChange}
              sx={{
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 21,
              }}
            >
              <Tab label="新規ポスト" value={0} />
              <Tab label="新規出品" value={1} />
            </TabList>
          </Box>
          <TabPanel value={0} sx={{ padding: 0 }}>
            <PostForm />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <PostProductForm />
          </TabPanel>
        </TabContext>
      </Box>
    </NotificationsProvider>
  );
};

export default DetailPostForm;
