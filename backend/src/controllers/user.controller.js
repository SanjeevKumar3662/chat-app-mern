import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { fullName, profilePic } = req.body;
    //todo add support for email here

    if (!fullName && !profilePic) {
      return res.status(400).json({ message: "Atleast one filed is required" });
    }

    let imageUrl;
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      imageUrl = uploadResponse.secure_url;
    }

    const updateFields = {
      ...(fullName && { fullName }),
      ...(imageUrl && { profilePic: imageUrl }),
    };
    const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
      new: true,
    }).select("-password");
    // console.log("updateUser", updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateUser controller: ", error);
    return res.status(500).json({ message: "Internal Sever Error" });
  }
};
