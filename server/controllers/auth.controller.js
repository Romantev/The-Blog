import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // ERROR FOR INVALID INPUT
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

  // HASH PASSWORD
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // CREATE NEW USER TO MONGODB
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // ERROR FOR INVALID INPUT
  if (!email || !password || email === "" || password === "")
    return next(errorHandler(400, "All fields are required!"));

  try {
    const validUser = await User.findOne({ email });
    // ERROR FOR INCORRECT USER
    if (!validUser) {
      return next(
        errorHandler(400, "Your email adress or your password is incorrect!")
      );
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // ERROR FOR INCORRECT PASSWORD
    if (!validPassword) {
      return next(
        errorHandler(400, "Your email adress or your password is incorrect!")
      );
    }
    // TOKEN
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // HIDE PASSWORD
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
