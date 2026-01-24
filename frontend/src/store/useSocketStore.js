import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,

  connectSocket: (userId) => {
    if (get().socket) return;

    const socket = io(`${import.meta.env.VITE_SERVER_URI}`, {
      query: { userId },
      // withCredentials: true,
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
