import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

const SignUpPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800">
      <img
        src="/chat-with-sanjeev-icon.png"
        className="max-md:max-w-[80%] "
        alt=""
      />
      <div className="border border-black w-100  flex justify-around flex-col p-5 gap-5 rounded-md bg-blue-300">
        <div className="flex justify-between gap-2 border border-black p-2 rounded-md">
          <label className="" htmlFor="fullName">
            Full Name
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="p-1 rounded-md bg-gray-600 text-white"
            type="email"
          />
        </div>
        <div className="flex justify-between gap-2 border border-black p-2 rounded-md">
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-1 rounded-md  bg-gray-600 text-white"
            type="email"
          />
        </div>
        <div className="flex justify-between gap-2 border border-black p-2 rounded-md">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-1 rounded-md  bg-gray-600 text-white"
            type="password"
          />
        </div>

        <button
          onClick={handleFormSubmit}
          className="bg-red-500 p-2 rounded-md"
        >
          Submit
        </button>
        <div>
          <span>Already have an account?</span>
          <Link to={"/login"}>
            <span className="text-blue-700 ">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
