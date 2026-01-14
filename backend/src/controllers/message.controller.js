import { Message } from "../models/message.model.js";
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

export const getMessages = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const myId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages message controller :", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
