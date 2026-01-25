import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//socket.io code
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./db/db.js";

const app = express();

const server = createServer(app);
const allowedOrigins =
  process.env.MODE !== "DEV"
    ? ["https://chat-app-mern-frontend-chi.vercel.app"]
    : ["http://localhost:5173"];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-mern-frontend-chi.vercel.app",
    ],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

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

await connectDB();
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});

export { io };
