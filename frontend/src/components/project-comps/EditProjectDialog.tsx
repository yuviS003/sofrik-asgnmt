import { Project } from "@/types/project";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface EditProjectDialogProps {
  selectedProject: Project | null;
  refreshProjects: () => void;
}

interface ProjectForm {
  title: string;
  description: string;
  status: "active" | "completed";
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  selectedProject,
  refreshProjects,
}) => {
  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectForm>({
    title: selectedProject?.title || "",
    description: selectedProject?.description || "",
    status: selectedProject?.status || "active",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [id.replace("project_edit_", "")]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setFormLoader(true);
      const response = await axios.put(
        `/api/projects?id=${selectedProject?._id}`,
        currentProject
      );

      if (response?.status === 200) {
        toast("Project updated successfully", { type: "success" });
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

  useEffect(() => {
    setCurrentProject({
      title: selectedProject?.title || "",
      description: selectedProject?.description || "",
      status: selectedProject?.status || "active",
    });
  }, [selectedProject]);

  if (!selectedProject) return null;
  return (
    <dialog id="update_project_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            id="close_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Edit project</h3>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset w-full pt-4">
            <label htmlFor="project_edit_title" className="label">
              Title
            </label>
            <input
              type="text"
              id="project_edit_title"
              value={currentProject.title}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder="Please enter a title"
              autoComplete="off"
            />

            <label htmlFor="project_edit_description" className="label">
              Description
            </label>
            <textarea
              id="project_edit_description"
              value={currentProject.description}
              onChange={handleChange}
              required
              placeholder="Please enter a description"
              className="textarea resize-none w-full"
            />

            <label htmlFor="project_edit_status" className="label">
              Status
            </label>
            <select
              id="project_edit_status"
              value={currentProject.status}
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

export default EditProjectDialog;
