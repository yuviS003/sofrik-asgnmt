const express = require("express");
const { getAllUsers } = require("../controllers/userController.js");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getAllUsers);

module.exports = router;
