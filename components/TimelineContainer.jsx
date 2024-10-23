"use client";
import { lazy, Suspense } from "react";

import { useTabContext } from "@/context/TabContext";
import TimelineLoading from "@/components/loading/TimelineLoading";

const Timeline = lazy(() => import("@/components/Timeline"));

const TimelineContainer = () => {
  const { activeTab, tabContents } = useTabContext();

  return (
    <>
      <Suspense fallback={<TimelineLoading />}>
        {tabContents.map((name, idx) => (
          <Timeline key={idx} name={name} isActive={idx === activeTab} />
        ))}
      </Suspense>
    </>
  );
};

export default TimelineContainer;
