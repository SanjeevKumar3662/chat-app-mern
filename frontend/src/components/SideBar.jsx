import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";

export const SideBar = ({ setChatTarget }) => {
  const [users, setUsers] = useState(null);
  const { getUsers } = useMessageStore();

  useEffect(() => {
    if (users !== null) return;
    (async () => {
      const data = await getUsers();
      setUsers(data);
    })();
  }, [getUsers]);

  // console.log("users:", users);
  console.log("Sidebar rendered");
  return (
    <section className="bg-green-200 flex-1  ">
      <ul className="flex flex-col p-3 gap-2">
        {users &&
          users.map((user) => {
            return (
              <li
                onClick={() => setChatTarget(user._id)}
                className="bg-blue-400 p-2 rounded-md"
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
