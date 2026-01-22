import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  console.log("authUser", authUser);

  return (
    <div className="px-2 py-6 bg-blue-400 flex justify-between text-xl gap-5">
      <Link to="/">
        <div>Home</div>
      </Link>
      <span>{authUser ? `${authUser.fullName} is loggedIn ` : "Home"}</span>

      {authUser ? (
        <button
          className="bg-red-500 rounded-md text-white px-2 py-1"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className=" bg-violet-600 rounded-md" text-white px-2 py-1>
            login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
