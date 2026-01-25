import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth :", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created successfully");
    } catch (error) {
      toast.error(error.response.error.message);
      console.log("auth error : ", error.response.error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("User LoggedOut");
    } catch (error) {
      toast.error(error.response.error.message);
      console.log("error in login : ", error.response.error.message);
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      // console.log("user res", res.data);
      set({ authUser: res.data });
      toast.success("Login Successfull");
    } catch (error) {
      toast.error(error.response.error.message);
      console.log("login error :", error.response.error.message);
    }
  },

  updateUser: async (data) => {
    if (!data || Object.keys(data).length === 0) {
      toast.error("updateUser failed: input data is empty");
      return;
    }
    try {
      const res = await axiosInstance.patch("/user/me", data);
      console.log("res form updateUser :", res.data);
      set({ authUser: res.data });

      return res.data;
    } catch (error) {
      console.log("Error in UpdateUser:", error);
      toast.error(error.response?.data?.message || "Error in updateUser");

      throw error;
    }
  },
}));
