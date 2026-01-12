import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const DB_NAME = process.env.DB_NAME;
  console.log(`DB: ${MONGODB_URI}/${DB_NAME}`);
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error : ", error);
  }
};
