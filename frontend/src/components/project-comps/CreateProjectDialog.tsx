import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface ProjectForm {
  title: string;
  description: string;
  status: "active" | "completed";
}

interface CreateProjectDialogProps {
  refreshProjects: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  refreshProjects,
}) => {
  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<ProjectForm>({
    title: "",
    description: "",
    status: "active",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [id.replace("project_", "")]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setFormLoader(true);
      const response = await axios.post("/api/projects", newProject);

      if (response?.status === 201) {
        toast("Project created successfully", { type: "success" });
        refreshProjects();
        document.getElementById("close_modal")?.click();
      }
    } catch (error: any) {
      toast(
        error.response?.data?.message ||
          error.message ||
          "Error fetching projects",
        { type: "error" }
      );
    } finally {
      setFormLoader(false);
    }
  };

  return (
    <dialog id="create_project_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            id="close_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Create a new project</h3>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset w-full pt-4">
            <label htmlFor="project_title" className="label">
              Title
            </label>
            <input
              type="text"
              id="project_title"
              value={newProject.title}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder="Please enter a title"
              autoComplete="off"
            />

            <label htmlFor="project_description" className="label">
              Description
            </label>
            <textarea
              id="project_description"
              value={newProject.description}
              onChange={handleChange}
              required
              placeholder="Please enter a description"
              className="textarea resize-none w-full"
            />

            <label htmlFor="project_status" className="label">
              Status
            </label>
            <select
              id="project_status"
              value={newProject.status}
              onChange={handleChange}
              required
              className="select w-full"
            >
              <option disabled>Pick a status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <button
              type="submit"
              disabled={formLoader}
              className="w-full btn btn-primary rounded-box mt-4 disabled:opacity-60 transition"
            >
              {formLoader && <span className="loading loading-spinner" />}{" "}
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default CreateProjectDialog;
