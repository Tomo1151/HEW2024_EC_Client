"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { TabContext, TabList, TabPanel } from "@mui/lab";

import ProfileUserTimeline from "./ProfileUserTimeline";
import { Box, Button, Tab } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const ProfileContainer = ({ user }) => {
  const profile_image = "https://placeholder.com/150";
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box
        component="section"
        className="p-8"
        sx={{
          mx: 3,
          backgroundColor: "primary.main",
          color: "white",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <Button
          variant="contained"
          className="absolute top-4 left-6"
          sx={{
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
        >
          フォロー
        </Button>
        <Link
          href={`${user.username}/edit`}
          className="absolute top-4 right-6"
          scroll={false}
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
        <Image
          src={profile_image}
          width={125}
          height={125}
          alt="ユーザーアイコン"
          className="rounded-full mx-auto"
          priority
        />
        <div className="text-center px-12 py-4 grow">
          <p className={"font-bold text-3xl pb-2 tracking-wider"}>
            {user.username}
          </p>
          <div className="flex justify-evenly py-2">
            <p className=" text-lg hover:underline">
              <Link href={`${user.username}/follows`}>フォロー</Link>
            </p>
            <p className="text-lg hover:underline">
              <Link href={`${user.username}/followers`}>フォロワー</Link>
            </p>
            <p>
              <StarIcon sx={{ color: "rgb(255, 185, 0)" }} />
              <span className="text-xl inline-block h-full pl-2 align-top">
                4.0
              </span>
            </p>
          </div>
          <p
            className={`${false ? "" : "opacity-35 select-none "}font-bold mt-4`}
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
            mx: 3,
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

        <TabPanel value={0} sx={{ pt: 0 }}>
          <ProfileUserTimeline user={user} />
        </TabPanel>
        <TabPanel value={1} sx={{ pt: 0 }}>
          <ProfileUserTimeline user={user} />
        </TabPanel>
        <TabPanel value={2} sx={{ pt: 0 }}>
          <ProfileUserTimeline user={user} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ProfileContainer;
