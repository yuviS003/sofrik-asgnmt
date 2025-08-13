const Task = require("../models/Task");

async function getAllTasksForUser(userId, reqQuery) {
  const { onlyMine } = reqQuery;

  const taskFindQuery =
    onlyMine === "true"
      ? {
          userId,
          projectId: { $ne: null },
        }
      : {
          projectId: { $ne: null },
        };

  const tasks = await Task.find(taskFindQuery)
    .populate({
      path: "projectId",
      select: "_id title description status createdAt",
    })
    .populate({
      path: "assignedUserId",
      select: "_id email",
    })
    .lean();

  const groupedMap = tasks.reduce((acc, task) => {
    const projectId = task.projectId?._id?.toString();
    if (!projectId) return acc;

    if (!acc[projectId]) {
      acc[projectId] = {
        project: task.projectId,
        tasks: [],
      };
    }

    // Remove redundant projectId from each task before pushing
    const { projectId: _p, ...taskWithoutProject } = task;
    acc[projectId].tasks.push(taskWithoutProject);

    return acc;
  }, {});

  return Object.values(groupedMap);
}

async function createTask(data) {
  return await Task.create(data);
}

async function updateTask(id, data) {
  return await Task.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = {
  getAllTasksForUser,
  createTask,
  updateTask,
  deleteTask,
};
