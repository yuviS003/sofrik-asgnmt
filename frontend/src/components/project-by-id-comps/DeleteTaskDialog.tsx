import { Task } from "@/types/task";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface DeleteTaskDialogProps {
  currentTask: Task | null;
  refresh: () => void;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  currentTask,
  refresh,
}) => {
  const [loader, setLoader] = useState<boolean>(false);

  const handleDeleteTask = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/api/tasks/?id=${currentTask?._id}`);
      if (response?.status === 200) {
        toast("Task deleted successfully", { type: "success" });
        refresh();
        document.getElementById("close_modal")?.click();
      }
    } catch (error: any) {
      toast(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting task",
        { type: "error" }
      );
    } finally {
      setLoader(false);
    }
  };

  if (!currentTask) return null;
  return (
    <dialog id="delete_task_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            id="close_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Delete Task</h3>
        <p className="py-4">Are you sure you want to delete this task?</p>
        <div className="w-full flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={loader}
            onClick={handleDeleteTask}
            className="btn btn-sm rounded-box btn-error disabled:opacity-60 transition"
          >
            {loader && <span className="loading loading-spinner"></span>}
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteTaskDialog;
