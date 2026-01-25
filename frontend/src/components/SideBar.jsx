import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import Navbar from "./Navbar";
import { useFeatureStore } from "../store/useFeatureStore";

export const SideBar = ({ setChatTarget }) => {
  const [users, setUsers] = useState(null);
  const { getUsers } = useMessageStore();

  const { showSettings, toggleShowSettings } = useFeatureStore();

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
    <section className="flex-1 bg-linear-to-r from-slate-900 to-slate-700 overflow-y-auto">
      <Navbar />
      <ul className="flex flex-col p-3 gap-2">
        {users &&
          users.map((user) => {
            return (
              <li
                onClick={() => {
                  setChatTarget(user);
                  if (showSettings) {
                    toggleShowSettings();
                  }
                }}
                className="flex gap-2 items-center bg-blue-400 active:bg-blue-300 p-2 rounded-md  cursor-pointer"
                key={user._id}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user?.profilePic}
                />{" "}
                {user.fullName}
              </li>
            );
          })}
      </ul>
    </section>
  );
};
