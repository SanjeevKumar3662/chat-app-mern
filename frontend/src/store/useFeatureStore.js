import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";

export const useFeatureStore = create((set) => ({
  showSettings: false,
  toggleShowSettings: () => {
    set((state) => ({
      showSettings: !state.showSettings,
    }));
  },
  //for uploading image
  handleImageChange: (e) => {
    return new Promise((resolve, reject) => {
      const file = e.target.files[0];
      if (!file) return resolve(null);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(null);
    });
  },
}));
