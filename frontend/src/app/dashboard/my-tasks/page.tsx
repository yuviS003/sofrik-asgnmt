"use client";

import TasksSkeleton from "@/components/tasks-comps/TasksSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AssignedUser {
  _id: string;
  email: string;
}

interface TaskItem {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  assignedUserId?: AssignedUser;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface GroupedTasks {
  project: Project;
  tasks: TaskItem[];
}

const MyTasksPage = () => {
  const [tasks, setTasks] = useState<GroupedTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyMine] = useState(true);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<GroupedTasks[]>("/api/tasks", {
        params: { onlyMine: showOnlyMine },
      });
      if (response?.status === 200) {
        setTasks(response.data);
      }
    } catch (error: any) {
      toast(
        error.response?.data?.message ||
          error.message ||
          "Error fetching tasks",
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, [showOnlyMine]);

  const renderTaskList = (list: TaskItem[]) =>
    list.map((_t) => (
      <div
        key={_t._id}
        className="w-full bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition rounded-lg p-3 flex flex-col gap-1"
      >
        <span className="font-semibold">{_t.title}</span>
        <span className="text-sm text-gray-500">{_t.description}</span>
        <span className="text-xs text-gray-400">
          Due: {_t.dueDate?.split("T")[0]}
        </span>
        {_t.assignedUserId && (
          <span className="text-xs text-primary">
            Assigned: {_t.assignedUserId.email}
          </span>
        )}
      </div>
    ));

  let content;
  if (loading) {
    content = <TasksSkeleton />;
  } else if (tasks.length > 0) {
    content = tasks.map((taskGroup, i) => (
      <div
        key={taskGroup.project._id}
        className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg shadow"
      >
        <input type="radio" name="my-accordion-3" defaultChecked={i === 0} />
        <div className="collapse-title font-semibold flex items-center gap-2">
          {i + 1}. {taskGroup.project.title}
          <div className="badge badge-secondary">{taskGroup.tasks.length}</div>
        </div>
        <div className="collapse-content text-sm grid grid-cols-4 gap-4">
          {/* TodoTasks */}
          <div className="w-full border border-primary rounded-lg h-80 overflow-y-auto p-2 flex flex-col gap-2">
            <span className="font-bold text-primary">Todo</span>
            {renderTaskList(
              taskGroup.tasks.filter((_t) => _t.status === "todo")
            )}
          </div>

          {/* In Progress */}
          <div className="w-full border border-warning rounded-lg h-80 overflow-y-auto p-2 flex flex-col gap-2">
            <span className="font-bold text-warning">In Progress</span>
            {renderTaskList(
              taskGroup.tasks.filter((_t) => _t.status === "in-progress")
            )}
          </div>

          {/* Completed */}
          <div className="w-full border border-success rounded-lg h-80 overflow-y-auto p-2 flex flex-col gap-2">
            <span className="font-bold text-success">Completed</span>
            {renderTaskList(
              taskGroup.tasks.filter((_t) => _t.status === "completed")
            )}
          </div>

          <div />
        </div>
      </div>
    ));
  } else {
    content = (
      <div className="w-full h-full pt-32 flex flex-col items-center justify-center text-sm italic">
        No Tasks
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 p-7">
      <div className="w-full flex items-center justify-between">
        <h2 className="prose text-2xl">My Tasks</h2>
        {/* <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={showOnlyMine}
            onChange={(e) => setShowOnlyMine(e.target.checked)}
          />
          <span className="text-base-content font-medium">
            Show only my tasks
          </span>
        </label> */}
      </div>

      {content}
    </div>
  );
};

export default MyTasksPage;
