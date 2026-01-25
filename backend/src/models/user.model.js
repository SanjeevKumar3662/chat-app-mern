import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dwccikzgp/image/upload/v1769278865/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y_xqnoyx.png",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
