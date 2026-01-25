import { useState } from "react";
import { SideBar } from "../components/SideBar";
import { Chat } from "../components/Chat";
import SettingsPage from "./SettingsPage";
import { useFeatureStore } from "../store/useFeatureStore";

function HomePage() {
  const [chatTarget, setChatTarget] = useState(null);
  const { showSettings } = useFeatureStore();

  return (
    <div className="flex h-screen">
      <SideBar setChatTarget={setChatTarget} />
      {showSettings ? <SettingsPage /> : <Chat chatTarget={chatTarget} />}
    </div>
  );
}

export default HomePage;
