import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
// import job from "./cron/cron.js";

dotenv.config();

connectDB();
// job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Cloudinary configuration not ready yet
cloudinary.config({
  cloud_name: "dweb8jnrw",
  api_key: "748484417788973",
  api_secret: "pEtQQYjuoeiKhQrJwY_nmBaJF5g",
});

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/posts", postRoutes); // Post-related routes
app.use("/api/messages", messageRoutes); // Message-related routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);

export default app; // Export the app for testing purposes
