import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,

  connectSocket: (userId) => {
    if (get().socket) return;

    const socket = io("http://localhost:3000", {
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
