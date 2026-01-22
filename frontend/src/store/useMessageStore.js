import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create(() => {
  return {
    // users: null,
    getUsers: async () => {
      try {
        const res = await axiosInstance.get("/message/user");
        // set({ users: res.data });
        return res.data;
      } catch (error) {
        toast.error(error.response.error.message);
        console.log("Error in useMessageStore", error.response.error.message);
      }
    },
  };
});
