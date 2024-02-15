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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
