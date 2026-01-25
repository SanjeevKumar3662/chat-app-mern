import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
// import Navbar from "./Navbar";
import { useFeatureStore } from "../store/useFeatureStore";

export const SideBar = ({ setChatTarget }) => {
  const [users, setUsers] = useState(null);
  const { getUsers } = useMessageStore();

  const { showSettings, setShowSettings } = useFeatureStore();

  useEffect(() => {
    if (users !== null) return;
    (async () => {
      const data = await getUsers();
      setUsers(data);
      setChatTarget(data[0]);
    })();
  }, [getUsers, setChatTarget, users]);

  // console.log("users:", users);
  // console.log("Sidebar rendered");
  return (
    <section className="flex-1 bg-linear-to-r from-slate-900 to-slate-700 h-full flex flex-col">
      {/* Optional fixed header */}
      {/* <Navbar /> */}

      {/* Scrollable users list */}
      <ul className="flex-1 flex flex-col p-3 gap-2 overflow-y-auto">
        {users &&
          users.map((user) => (
            <li
              key={user._id}
              onClick={() => {
                setChatTarget(user);
                if (showSettings) setShowSettings(false);
              }}
              className="flex gap-2 items-center bg-blue-400 active:bg-blue-300 p-2 rounded-md cursor-pointer"
            >
              <img className="w-12 h-12 rounded-full" src={user?.profilePic} />
              {user.fullName}
            </li>
          ))}
      </ul>
    </section>
  );
};
