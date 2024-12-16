"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Box, Button, IconButton, ThemeProvider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";
import { useUserContext } from "@/context/UserContext";
// import {
//   NotificationsProvider,
//   useNotifications,
// } from "@toolpad/core/useNotifications";
import { fetchHeaders } from "@/config/fetchConfig";
import CircularLoading from "@/components/loading/CircularLoading";
import Link from "next/link";
import NotificationCard from "@/components/NotificationCard";

const NotificationPage = () => {
  const { refreshToken } = useUserContext();
  const [notificationsData, setNotificationsData] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async () => {
    refreshToken().then(async () => {
      const query = {
        before:
          notificationsData && notificationsData.length > 0
            ? notificationsData[notificationsData.length - 1].id
            : "",
      };

      const params = new URLSearchParams(query);

      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/notifications?" + params,
        {
          method: "GET",
          headers: fetchHeaders,
          credentials: "include",
        }
      );

      const resJson = await response.json();

      if (resJson.success) {
        setNotificationsData(
          notificationsData
            ? notificationsData.concat(resJson.data)
            : resJson.data
        );
        readNotification(resJson.data.map((n) => n.id));
        setHasMore(resJson.data.length > 0);
      }
    });
  };

  const readNotification = async (ids) => {
    if (!ids || ids.length === 0) return;
    try {
      // refreshToken().then(async () => {
      await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/notifications`, {
        method: "PUT",
        headers: fetchHeaders,
        body: JSON.stringify({ ids }),
        credentials: "include",
      });
      // });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // readNotification();
  }, []);

  return (
    // <NotificationsProvider>
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">通知</h3>
      </MainColumnHeader>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNotifications}
        hasMore={hasMore}
        loader={<CircularLoading key={0} />}
      >
        {notificationsData && notificationsData.length > 0
          ? notificationsData.map((notification) => (
              <NotificationCard
                key={notification.id}
                type={notification.type}
                is_read={notification.is_read}
                sender={notification.sender}
                rel_post={notification.rel_post}
              />
            ))
          : notificationsData?.length === 0 && (
              <Box sx={{ mt: 10, textAlign: "center" }}>
                <h3 className="text-2xl font-bold text-gray-400">
                  まだ通知はありません
                </h3>
              </Box>
            )}
      </InfiniteScroll>
    </ThemeProvider>
    // </NotificationsProvider>
  );
};

export default NotificationPage;
