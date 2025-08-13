const User = require("../models/User");

const getAllUsers = async (userId) => {
  const users = await User.find().select("id email");
  return users.map((user) => {
    return { id: user.id, email: user.email, isItMe: user.id === userId };
  });
};

module.exports = { getAllUsers };
