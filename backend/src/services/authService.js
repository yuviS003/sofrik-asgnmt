const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const SALT_ROUNDS = 10;

exports.registerUser = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error("Email and password required");
    err.statusCode = 400;
    throw err;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ email, password: hashed });
  await user.save();

  const token = generateToken({ id: user._id });
  return { user, token };
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error("Email and password required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ id: user._id });
  return { user, token };
};
