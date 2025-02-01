"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { TabContext, TabList, TabPanel } from "@mui/lab";

import ProfileUserTimeline from "./ProfileUserTimeline";
import { Box, Tab } from "@mui/material";

import FollowButton from "@/components/FollowButton";

import StarIcon from "@mui/icons-material/Star";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useUserContext } from "@/context/UserContext";
import CircularLoading from "./loading/CircularLoading";

import { fetchHeaders } from "@/config/fetchConfig";
import { urlForImage } from "@/utils/utils";
import { countFormat } from "@/utils/countFormat";
import StarRating from "./StarRating";

const ProfileContainer = ({ username }) => {
  const fallback_img = "https://placeholder.com/150";
  const [user, setUser] = useState(null);

  const { activeUser, refreshToken } = useUserContext();
  const [tabIndex, setTabIndex] = useState(0);

  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUserData = async () => {
    try {
      refreshToken().then(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/users/${username}`,
          {
            method: "GET",
            headers: { ...fetchHeaders },
            credentials: "include",
          }
        );
        const resJson = await response.json();

        if (resJson.success) {
          // console.log(resJson.data);
          setUser(resJson.data);
          setIsFollowing(resJson.data.followers.length > 0);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    (async () => {
      await fetchUserData();
    })();
  }, []);

  if (!user) {
    return <CircularLoading />;
  }

  return (
    <>
      <Box
        component="section"
        className="p-4 sm:p-8"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {activeUser && activeUser.username !== user.username && (
          <FollowButton
            username={user.username}
            is_following={isFollowing}
            set_is_following={setIsFollowing}
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1.25rem",
              backgroundColor: "white",
              color: "primary.main",
              boxShadow: "none",
              borderRadius: "100px",
              transitionProperty: "filter",
              transitionDuration: ".25s",
              ":hover": {
                boxShadow: "none",
                filter: "brightness(90%)",
              },
            }}
          />
        )}
        {activeUser && activeUser.username === user.username && (
          <Link
            href={`${user.username}/edit`}
            className="absolute top-4 right-6"
            scroll={false}
            replace
          >
            <SettingsRoundedIcon
              sx={{
                fontSize: "32px",
                boxShadow: "none",
                borderRadius: "100px",
                transitionProperty: "filter",
                transitionDuration: ".25s",
                ":hover": {
                  boxShadow: "none",
                  filter: "brightness(90%)",
                },
              }}
            />
          </Link>
        )}

        <Box
          sx={{
            position: "relative",
            width: { xs: "100px", sm: "125px" },
            height: { xs: "100px", sm: "125px" },
            mt: { xs: "3.5em", sm: "0" },
            mx: "auto",
          }}
        >
          {user.icon_link && (
            <Link
              href={urlForImage(user.icon_link)}
              scroll={false}
              target="_blank"
              className="absolute inset-0 w-full h-full"
            ></Link>
          )}
          <Image
            src={urlForImage(user.icon_link)}
            width={125}
            height={125}
            alt="ユーザーアイコン"
            className="rounded-full object-cover w-full h-full"
            priority
          />
        </Box>
        <div className="text-center px-2 sm:px-12 py-4 grow">
          <p className={"font-bold text-[2em] pb-2 tracking-wider"}>
            {user.nickname || user.username}
          </p>
          <div className="flex justify-evenly py-2">
            <p className=" text-[1em] hover:underline">
              <Link href={`${user.username}/follows`} scroll={false}>
                フォロー: {countFormat(user._count.followees)}
              </Link>
            </p>
            <p className="text-[1em] hover:underline">
              <Link href={`${user.username}/followers`} scroll={false}>
                フォロワー: {countFormat(user._count.followers)}
              </Link>
            </p>
            <p>
              <StarRating
                rating={
                  user.rating._avg.value
                    ? user.rating._avg.value.toFixed(1)
                    : "評価なし"
                }
              />
            </p>
          </div>
          <p
            className={`${user.bio ? "" : "opacity-35 select-none "}font-bold mt-4`}
          >
            {user.bio || "ここには何も書かれていないようだ"}
          </p>
          <p className="mt-4">
            {user.homepage_link ? (
              <Link
                href={user.homepage_link}
                className="font-mono hover:underline"
              >
                {user.homepage_link}
              </Link>
            ) : (
              <></>
            )}
          </p>
        </div>
      </Box>

      <TabContext value={tabIndex}>
        <TabList
          onChange={handleTabChange}
          variant="fullWidth"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Timeline tabs list"
          sx={{
            backgroundColor: "white",
            borderBottom: "1px solid #e0e0e0",
            position: "sticky",
            top: 0,
            zIndex: 21,
          }}
        >
          <Tab label="投稿" value={0} />
          <Tab label="商品" value={1} />
          <Tab label="いいね" value={2} />
        </TabList>

        <TabPanel value={0} sx={{ pt: 0, px: 0 }}>
          <ProfileUserTimeline
            user={user}
            endpoint="posts"
            isActive={tabIndex === 0}
          />
        </TabPanel>
        <TabPanel value={1} sx={{ pt: 0, px: 0 }}>
          <ProfileUserTimeline
            user={user}
            endpoint="products"
            isActive={tabIndex === 1}
          />
        </TabPanel>
        <TabPanel value={2} sx={{ pt: 0, px: 0 }}>
          <ProfileUserTimeline
            user={user}
            endpoint="likes"
            isActive={tabIndex === 2}
          />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ProfileContainer;
