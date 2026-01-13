import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({
        message: "Failed to create the user",
      });
    }

    generateToken(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      message: "Signup successful",
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login auth controller :", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: "0",
    });

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("error in logout auth controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
