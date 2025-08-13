import { Task } from "@/types/task";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type TaskStatus = "todo" | "in-progress" | "done";

interface TaskForm {
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignedUserId: string | null;
}

interface EditTaskDialogProps {
  currentTask: Task | null;
  refresh: () => void;
}

interface User {
  id: string;
  email: string;
  isItMe: boolean;
}

interface AxiosResponseData {
  data: User[] | TaskForm;
  status: number;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  currentTask,
  refresh,
}) => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [taskDetails, setTaskDetails] = useState<TaskForm>({
    projectId: currentTask?.projectId ?? "",
    title: currentTask?.title ?? "",
    description: currentTask?.description ?? "",
    status: (currentTask?.status as TaskStatus) ?? "todo",
    dueDate: currentTask?.dueDate?.split("T")[0] ?? "",
    assignedUserId: currentTask?.assignedUserId ?? null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [id.replace("task_", "")]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);

      const response = await axios.put(
        `/api/tasks?id=${currentTask?._id}`,
        taskDetails
      );

      if (response?.status === 200) {
        toast("Task updated successfully!", { type: "success" });
        refresh();

        document.getElementById("close_modal")?.click();
        setTaskDetails({
          projectId: currentTask?.projectId ?? "",
          title: "",
          description: "",
          status: "todo",
          dueDate: "",
          assignedUserId: null,
        });
      }
    } catch (error: any) {
      toast(
        error.response?.data?.message || error.message || "Error creating task",
        { type: "error" }
      );
    } finally {
      setLoader(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      const response = await axios.get<AxiosResponseData>("/api/users");
      if (response.status === 200) {
        setUsers(response.data as unknown as User[]);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error fetching users";
      toast(errorMessage, { type: "error" });
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  useEffect(() => {
    setTaskDetails({
      projectId: currentTask?.projectId ?? "",
      title: currentTask?.title ?? "",
      description: currentTask?.description ?? "",
      status: (currentTask?.status as TaskStatus) ?? "todo",
      dueDate: currentTask?.dueDate?.split("T")[0] ?? "",
      assignedUserId: currentTask?.assignedUserId ?? null,
    });
  }, [currentTask]);

  return (
    <dialog id="edit_task_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            id="close_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit</h3>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset w-full pt-4">
            <label htmlFor="task_title" className="label">
              Title
            </label>
            <input
              type="text"
              id="task_title"
              value={taskDetails.title}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder="Please enter a title"
              autoComplete="off"
            />

            <label htmlFor="task_description" className="label">
              Description
            </label>
            <textarea
              id="task_description"
              value={taskDetails.description}
              onChange={handleChange}
              required
              placeholder="Please enter a description"
              className="textarea resize-none w-full"
            />

            <label htmlFor="task_dueDate" className="label">
              Due Date
            </label>
            <input
              type="date"
              id="task_dueDate"
              value={taskDetails.dueDate}
              onChange={handleChange}
              required
              className="input w-full"
              autoComplete="off"
            />

            <label htmlFor="task_status" className="label">
              Status
            </label>
            <select
              id="task_status"
              value={taskDetails.status}
              onChange={handleChange}
              required
              className="select w-full"
            >
              <option value="todo">To-do</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>

            <label htmlFor="task_assignedUserId" className="label">
              Assign to
            </label>
            <select
              id="task_assignedUserId"
              value={taskDetails.assignedUserId || ""}
              onChange={handleChange}
              className="select w-full"
            >
              <option value="" disabled>
                Assign to
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email} {user.isItMe && "(You)"}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loader}
              className="w-full btn btn-primary rounded-box mt-4 disabled:opacity-60 transition"
            >
              {loader && <span className="loading loading-spinner" />}
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default EditTaskDialog;
