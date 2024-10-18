"use client";

import PostForm from "@/components/PostForm";
import Timeline from "@/components/Timeline";
import TimelineTabSelector from "@/components/TimelineTabSelector";
import { TabProvider, useTabContext } from "@/context/TabContext";
import { useAuthContext } from "@/context/AuthContext";
import TimelineContainer from "@/components/TimelineContainer";

export default function App() {
  const { activeUser } = useAuthContext();

  return (
    <TabProvider>
      <main className="w-[1000px] bg-transparent mx-auto">
        {activeUser && (
          <>
            <TimelineTabSelector />
            <PostForm />
          </>
        )}
        <TimelineContainer />
      </main>
    </TabProvider>
  );
}
