import axios from "axios";
import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

type TaskStatus = "todo" | "in-progress" | "done";

interface User {
  id: string;
  email: string;
  isItMe: boolean;
}

interface TaskForm {
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignedUserId: string | null;
}

interface CreateTasksDialogProps {
  projectId: string;
  refresh: () => void;
}

interface AxiosResponseData {
  data: User[] | TaskForm;
  status: number;
}

const CreateTaskDialog: React.FC<CreateTasksDialogProps> = ({
  projectId,
  refresh,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [taskDetails, setTaskDetails] = useState<TaskForm>({
    projectId,
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
    assignedUserId: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id.startsWith("task_")) {
      setTaskDetails((prev) => ({
        ...prev,
        [id.replace("task_", "")]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);

      const response = await axios.post<TaskForm>("/api/tasks", taskDetails);

      if (response.status === 201) {
        toast("Task created successfully!", { type: "success" });
        refresh();

        document.getElementById("close_modal")?.click();
        setTaskDetails({
          projectId,
          title: "",
          description: "",
          status: "todo",
          dueDate: "",
          assignedUserId: null,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error creating task";
      toast(errorMessage, { type: "error" });
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

  return (
    <dialog id="create_task_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            id="close_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a new task</h3>

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

export default CreateTaskDialog;
