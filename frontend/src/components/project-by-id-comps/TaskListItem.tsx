import React from "react";
import { Task } from "@/types/task";

interface TaskListItemProps {
  task: Task;
  triggerTaskModifyDialog: (task: any, action: "edit" | "delete") => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  triggerTaskModifyDialog,
}) => {
  const statusClassMap: Record<string, string> = {
    "in-progress": "badge-success",
    todo: "badge-warning",
    done: "badge-primary",
  };

  return (
    <div className="w-full border border-gray-600 rounded-box pb-4 pt-6 px-4 flex flex-col gap-2 relative">
      <div className="w-full flex items-center gap-3">
        <h3 className="text-xl">{task?.title}</h3>
        <div
          className={`badge badge-sm ${
            statusClassMap[task?.status] || ""
          } capitalize`}
        >
          {task?.status}
        </div>
      </div>
      <p className="text-sm line-clamp-2">{task?.description}</p>
      <span className="text-end text-sm">
        {task?.dueDate
          ? new Date(task.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No due date"}
      </span>
      <div className="w-fit absolute top-1 right-1 flex gap-2">
        {/* Edit button */}
        <button
          type="button"
          onClick={() => triggerTaskModifyDialog(task, "edit")}
          className="btn btn-square"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.651 1.651a2.25 2.25 0 010 3.182l-8.486 8.486a2.25 2.25 0 01-1.061.59l-4.125.825a.75.75 0 01-.904-.904l.825-4.125a2.25 2.25 0 01.59-1.061l8.486-8.486a2.25 2.25 0 013.182 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75l1.5 1.5"
            />
          </svg>
        </button>

        {/* Delete button */}
        <button
          type="button"
          onClick={() => triggerTaskModifyDialog(task, "delete")}
          className="btn btn-square"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.108 1.022.169m-1.022-.169L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .566c.34-.061.68-.117 1.022-.169m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.061-2.09 1.021-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskListItem;
