// import methods
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import routes
import userRoutes from "./routes/user.route.js";

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
const PORT = 3000;

// status test
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
