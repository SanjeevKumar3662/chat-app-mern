import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

function LoginPage() {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="border border-black w-100  flex justify-around flex-col p-5 gap-5 rounded-md bg-blue-300">
        <div className="flex gap-2 border border-black p-2 rounded-md">
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-1 rounded-md"
            type="email"
          />
        </div>
        <div className="flex gap-2 border border-black p-2 rounded-md">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-1 rounded-md"
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
          <span>Dont have an account?</span>
          <Link to={"/signup"}>
            <span className="text-blue-700 ">SignUp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
