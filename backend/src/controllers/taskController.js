const taskService = require("../services/taskService");

async function getTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasksForUser(req.user.id, req?.query);
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function createTask(req, res) {
  try {
    const task = await taskService.createTask({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
