import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set) => {
  return {
    messages: [],
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
    sendMessage: async (receiverId, message) => {
      try {
        const res = await axiosInstance.post(
          `/message/send/${receiverId}`,
          message
        );
        // console.log("message sent", res.data);
        set((state) => ({ messages: [...state.messages, res.data] }));
        toast.success("Message Sent");
      } catch (error) {
        console.log("sendMessage error:", error);

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to send message"
        );
      }
    },
    getMessage: async (senderId) => {
      try {
        const res = await axiosInstance.get(`/message/${senderId}`);
        set({ messages: res.data });
        // toast.success("message received");
      } catch (error) {
        toast.error("error in getMessage");
        console.log("error in getMessage", error.response.error.message);
      }
    },
    addMessage: (message) => {
      if (message === "") return;
      set((state) => ({
        messages: [...state.messages, message],
      }));
      toast.success("Received a message");
    },
  };
});
