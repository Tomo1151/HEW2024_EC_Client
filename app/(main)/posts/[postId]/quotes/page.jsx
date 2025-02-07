"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import TagHeading from "@/components/TagHeading";
import QuoteTimeline from "@/components/QuoteTimeline";
import CircularLoading from "@/components/loading/CircularLoading";

const QuotePage = ({ params }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const [quotedId, setQuotedId] = useState(null);

  useEffect(() => {
    setQuotedId(params.postId);
  }, [params]);

  if (!quotedId) {
    return (
      <>
        <MainColumnHeader>
          <h3 className="font-bold tracking-wider">引用リポスト</h3>
        </MainColumnHeader>
        <CircularLoading />
      </>
    );
  }

  return (
    <>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">引用リポスト</h3>
      </MainColumnHeader>
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
        </TabList>
        <TabPanel value={0} sx={{ pt: 0, px: 0 }}>
          <QuoteTimeline
            quotedId={quotedId}
            type="posts"
            isActive={tabIndex === 0}
          />
        </TabPanel>
        <TabPanel value={1} sx={{ pt: 0, px: 0 }}>
          <QuoteTimeline
            quotedId={quotedId}
            type="products"
            isActive={tabIndex === 1}
          />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default QuotePage;
