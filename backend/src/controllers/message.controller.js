import { io } from "../index.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password",
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
    const myId = req.user._id;
    // console.log(myId);

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

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // a todo : add socket.io here
    io.to(receiverId.toString()).emit("newMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage message controller :", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
