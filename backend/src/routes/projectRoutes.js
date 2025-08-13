const express = require("express");
const {
  getUserProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
} = require("../controllers/projectController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getUserProjects);
router.get("/:id", getProjectById);
router.post("/", createNewProject);
router.put("/:id", updateExistingProject);
router.delete("/:id", deleteExistingProject);

module.exports = router;
