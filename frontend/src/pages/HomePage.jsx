import { useState } from "react";
import { SideBar } from "../components/SideBar";
import { Chat } from "../components/Chat";

function HomePage() {
  const [chatTarget, setChatTarget] = useState(null);
  return (
    <div className="flex h-screen">
      <SideBar setChatTarget={setChatTarget} />
      <Chat chatTarget={chatTarget} />
    </div>
  );
}

export default HomePage;
