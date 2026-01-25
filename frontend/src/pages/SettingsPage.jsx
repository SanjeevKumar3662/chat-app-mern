import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useFeatureStore } from "../store/useFeatureStore";

export default function SettingsPage() {
  const { authUser, updateUser } = useAuthStore();
  const { handleImageChange } = useFeatureStore();
  console.log("authUser", authUser);

  const changeProfilePic = async (e) => {
    try {
      const imageBase64 = await handleImageChange(e);
      if (!imageBase64) return;
      await updateUser({ profilePic: imageBase64 });
    } catch (error) {
      console.error("changeProfilePic error:", error);
      toast.error("Failed to update profile picture");
    }
  };
  return (
    <div className=" bg-linear-to-r from-slate-900 to-slate-700 flex-3    justify-between overflow-y-auto">
      {/* this is the top bio section */}
      <section className="h-50 flex border border-white items-center justify-around">
        <div className=" flex flex-col  gap-3 p-4 ">
          <div className="w-32 h-32     ">
            {authUser?.profilePic === "" ? (
              <span className="text-center text-7xl rounded-full bg-blue-400">
                {authUser.fullName[0]}
              </span>
            ) : (
              <img className="rounded-full" src={authUser.profilePic} />
            )}
          </div>
          <input
            className="bg-amber-300 rounded-2xl w-30 "
            type="file"
            accept="image/*"
            onChange={changeProfilePic}
          />
        </div>
        <h1 className="  capitalize text-2xl text-white">
          {authUser.fullName}
        </h1>
      </section>
    </div>
  );
}
