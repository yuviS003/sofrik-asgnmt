const projectService = require("../services/projectService");

const getUserProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsByUser(req.user.id);
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const createNewProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.user.id, req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateExistingProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const deleteExistingProject = async (req, res, next) => {
  try {
    const project = await projectService.deleteProject(
      req.params.id,
      req.user.id
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
};
