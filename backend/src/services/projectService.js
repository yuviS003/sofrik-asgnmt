const { default: mongoose } = require("mongoose");
const Project = require("../models/Project");

const getProjectsByUser = async (userId) => {
  return await Project.find({ userId }).sort({ createdAt: -1 });
};

const getProjectById = async (projectId) => {
  const project = await Project.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
    {
      $lookup: {
        from: "tasks",
        let: { projectId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$projectId", "$$projectId"] } } },
          { $sort: { createdAt: -1 } },
        ],
        as: "tasks",
      },
    },
  ]);

  return project[0] || null;
};

const createProject = async (userId, projectData) => {
  return await Project.create({ ...projectData, userId });
};

const updateProject = async (projectId, userId, updateData) => {
  return await Project.findOneAndUpdate(
    { _id: projectId, userId },
    updateData,
    { new: true }
  );
};

const deleteProject = async (projectId, userId) => {
  return await Project.findOneAndDelete({ _id: projectId, userId });
};

module.exports = {
  getProjectsByUser,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
