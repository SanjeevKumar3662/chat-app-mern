import { User } from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user.userId } }).select(
      "-password"
    );

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("error in getUsersForSidebar message controller :", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
