import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//socket.io code
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./db/db.js";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-mern-backend-l5bi.onrender.com",
    ],
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  // console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(userId);
    // console.log("user joined a room", socket.id);
  }

  socket.on("disconnect", () => {
    console.log("User disconnected :", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server running on", PORT);
  connectDB();
});

export { io };
