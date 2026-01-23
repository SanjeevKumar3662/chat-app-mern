import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import Navbar from "./Navbar";

export const SideBar = ({ setChatTarget }) => {
  const [users, setUsers] = useState(null);
  const { getUsers } = useMessageStore();

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
    <section className="flex-1 bg-linear-to-r from-slate-900 to-slate-700">
      <Navbar />
      <ul className="flex flex-col p-3 gap-2">
        {users &&
          users.map((user) => {
            return (
              <li
                onClick={() => setChatTarget(user)}
                className="bg-blue-400 active:bg-blue-300 p-2 rounded-md  cursor-pointer "
                key={user._id}
              >
                {user.fullName}
              </li>
            );
          })}
      </ul>
    </section>
  );
};
