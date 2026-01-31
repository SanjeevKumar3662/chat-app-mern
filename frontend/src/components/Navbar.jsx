import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useFeatureStore } from "../store/useFeatureStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { showSettings, setShowSettings } = useFeatureStore();
  // const {  setShowSettings } = useFeatureStore();

  // console.log("authUser", authUser);

  return (
    <div className="px-2 sm:px-4 py-3 bg-blue-800 flex items-center  text-xl  max-h-18 ">
      {/* Left section */}
      <div className="flex-1 flex items-center gap-2">
        {authUser && (
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            src={authUser.profilePic}
            alt="profile"
          />
        )}
      </div>

      {/* Center logo */}
      <div className="flex-1 flex justify-center">
        <img
          className="h-7 sm:h-9 md:h-10 object-contain"
          src="/chat-with-sanjeev-icon.png"
          alt="logo"
        />
      </div>

      {/* Right section */}
      <div className="flex-1 flex justify-end items-center">
        {authUser ? (
          <button
            className="text-xl sm:text-2xl cursor-pointer hover:rotate-90 transition-transform duration-200"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-violet-600 text-white px-3 py-1 rounded-md text-sm sm:text-base">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
