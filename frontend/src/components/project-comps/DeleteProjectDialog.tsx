import { Project } from "@/types/project";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteProjectDialogProps {
  selectedProject: Project | null;
  refreshProjects: () => void;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  selectedProject,
  refreshProjects,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const handleProjectDelete = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/api/projects`, {
        params: {
          id: selectedProject?.id || selectedProject?._id,
        },
      });
      if (response?.status === 200) {
        toast("Project deleted successfully", { type: "success" });
        document.getElementById("close_modal")?.click();
        refreshProjects();
      }
    } catch (error: any) {
      toast(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting project",
        { type: "error" }
      );
    } finally {
      setLoader(false);
    }
  };
  if (!selectedProject) return null;
  return (
    <dialog id="delete_project_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Delete Project</h3>
        <p className="py-4">Are you sure you want to delete this project?</p>
        <div className="w-full flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={loader}
            onClick={handleProjectDelete}
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

export default DeleteProjectDialog;
