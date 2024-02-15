import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // if input is invalid
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  // hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // create new user to MongoDB
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Register successful!");
  } catch (error) {
    next(error);
  }
};
