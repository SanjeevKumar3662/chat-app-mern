import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useFeatureStore } from "../store/useFeatureStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { toggleShowSettings } = useFeatureStore();

  // console.log("authUser", authUser);

  return (
    <div className="px-2 py-3 bg-blue-800 flex justify-between text-xl gap-5">
      {/* <span className=" py-1 px-2 bg-blue-200 rounded-xl">
        {authUser ? `${authUser.fullName}${showSettings}` : "Home"}
      </span> */}

      <div className="">
        <img className="w-12 h-12 rounded-full" src={authUser?.profilePic} />
      </div>

      {authUser ? (
        <button
          className=" text-2xl  cursor-pointer active: hover:animate-spin   rounded-full"
          onClick={toggleShowSettings}
        >
          ⚙️
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
