"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Box, ThemeProvider } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";
import { useUserContext } from "@/context/UserContext";
// import {
//   NotificationsProvider,
//   useNotifications,
// } from "@toolpad/core/useNotifications";
import { fetchHeaders } from "@/config/fetchConfig";
import CircularLoading from "@/components/loading/CircularLoading";
import NotificationCard from "@/components/NotificationCard";

const NotificationPage = () => {
  const { refreshToken } = useUserContext();
  const [notificationsData, setNotificationsData] = useState(null);
  const [isPostFetching, setIsPostFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async () => {
    if (isPostFetching || !hasMore) return;
    setIsPostFetching(true);
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
        readNotification(
          resJson.data.filter((n) => !n.is_read).map((n) => n.id)
        );
        setHasMore(resJson.data.length === 10);
      }
    });
    setIsPostFetching(false);
  };

  const readNotification = async (ids) => {
    if (!ids || ids.length === 0) return;
    // console.log("send read: ", ids);
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
        hasMore={!isPostFetching && hasMore}
        loader={<CircularLoading key={0} />}
        initialLoad={false}
      >
        {notificationsData && notificationsData.length > 0
          ? notificationsData.map((notification) => (
              <NotificationCard
                key={notification.id}
                type={notification.type}
                is_read={notification.is_read}
                sender={notification.sender}
                rel_post={notification.rel_post}
                content={notification.content}
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
