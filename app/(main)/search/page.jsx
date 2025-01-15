"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import TagHeading from "@/components/TagHeading";
import SearchTimeline from "@/components/SearchTimeline";
import CircularLoading from "@/components/loading/CircularLoading";

const InsidePageComponent = ({}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const searchQuery = useSearchParams().get("q");
  const isSrcTagClick = useSearchParams().get("src") === "tag_click";

  // console.log(searchQuery);
  // console.log(isSrcTagClick);

  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // console.log("inside", query, isSrcTagClick);

  return (
    <>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">検索結果："{query}"</h3>
      </MainColumnHeader>
      {isSrcTagClick && <TagHeading tagName={query} />}
      <TabContext value={tabIndex}>
        <TabList
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          // keepMounted={false}
          sx={{
            backgroundColor: "white",
            borderBottom: "1px solid #e0e0e0",
            zIndex: 21,
          }}
        >
          <Tab label="投稿" value={0} />
          <Tab label="商品" value={1} />
          {!isSrcTagClick && <Tab label="ユーザー" value={2} />}
        </TabList>
        <TabPanel value={0} sx={{ pt: 0, px: 0 }}>
          <SearchTimeline
            type="posts"
            isSrcTagClick={isSrcTagClick}
            q={query}
            isActive={tabIndex === 0}
          />
        </TabPanel>
        <TabPanel value={1} sx={{ pt: 0, px: 0 }}>
          <SearchTimeline
            type="products"
            isSrcTagClick={isSrcTagClick}
            q={query}
            isActive={tabIndex === 1}
          />
        </TabPanel>
        {!isSrcTagClick && (
          <TabPanel value={2} sx={{ pt: 0, px: 0 }}>
            <SearchTimeline
              type="users"
              isSrcTagClick={isSrcTagClick}
              q={query}
              isActive={tabIndex === 2}
            />
          </TabPanel>
        )}
      </TabContext>
    </>
  );
};

const page = () => {
  return (
    <Suspense fallback={<CircularLoading />}>
      <InsidePageComponent />
    </Suspense>
  );
};

export default page;
