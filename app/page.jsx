"use client";

import Timeline from "@/components/Timeline";
import TimelineTabSelector from "@/components/TimelineTabSelector";
import { TabProvider } from "@/context/TabContext";

export default function App() {
  return (
    <TabProvider>
      <main className="w-[1000px] bg-transparent mx-auto">
        <TimelineTabSelector />
        <Timeline />
      </main>
    </TabProvider>
  );
}
