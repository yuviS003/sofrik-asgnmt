const userService = require("../services/userService.js");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers(req.user.id);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getAllUsers };
