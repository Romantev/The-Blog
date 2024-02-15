// import methods
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// middleware for errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
