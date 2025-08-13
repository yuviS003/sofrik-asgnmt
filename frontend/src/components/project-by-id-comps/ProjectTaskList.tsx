import React, { useState } from "react";
import TaskListItem from "./TaskListItem";
import { Task } from "@/types/task";
import DeleteTaskDialog from "./DeleteTaskDialog";
import EditTaskDialog from "./EditTaskDialog";

interface ProjectTaskListProps {
  tasks: any[];
  refresh: () => void;
}

const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  tasks,
  refresh,
}) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const triggerTaskModifyDialog = (task: any, action: "edit" | "delete") => {
    if (action === "delete") {
      setCurrentTask(task);
      (
        document.getElementById("delete_task_modal") as HTMLDialogElement
      )?.showModal();
      return;
    }

    if (action === "edit") {
      setCurrentTask(task);
      (
        document.getElementById("edit_task_dialog") as HTMLDialogElement
      )?.showModal();
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-2 py-4">
        {tasks.map((task, i) => (
          <TaskListItem
            key={`${task?._id}-${i}`}
            task={task}
            triggerTaskModifyDialog={triggerTaskModifyDialog}
          />
        ))}
      </div>
      <DeleteTaskDialog currentTask={currentTask} refresh={refresh} />
      <EditTaskDialog currentTask={currentTask} refresh={refresh} />
    </>
  );
};

export default ProjectTaskList;
