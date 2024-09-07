import Timeline from "@/components/Timeline";
import TimelineTabSelector from "@/components/TimelineTabSelector";
import { TabProvider } from "@/context/TabContext";

export default function App() {
  return (
    <TabProvider>
      <main className="w-[1000px] bg-sub-theme p-8 mx-auto shadow-lg">
        <TimelineTabSelector />
        <Timeline />
      </main>
    </TabProvider>
  );
}
