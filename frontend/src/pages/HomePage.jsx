import { useState } from "react";
import { SideBar } from "../components/SideBar";
import { Chat } from "../components/Chat";
import SettingsPage from "./SettingsPage";
// import { useFeatureStore } from "../store/useFeatureStore";
import Navbar from "../components/Navbar";

function HomePage() {
  const [chatTarget, setChatTarget] = useState(null);
  // const { showSettings } = useFeatureStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
        w-full md:w-1/3 lg:w-1/4
        ${chatTarget ? "hidden md:block" : "block"}
      `}
        >
          <SideBar setChatTarget={setChatTarget} />
        </div>

        {/* Chat */}
        <div
          className={`
        w-full md:flex-1
        ${chatTarget ? "block" : "hidden md:block"}
      `}
        >
          <Chat chatTarget={chatTarget} onBack={() => setChatTarget(null)} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
