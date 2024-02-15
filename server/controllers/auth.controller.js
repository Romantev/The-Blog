import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (error) {
    res.status(500).json("failed to register!");
  }

  res.json("Register successful!");
};
