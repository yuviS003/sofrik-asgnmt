"use client";

import CreateProjectDialog from "@/components/project-comps/CreateProjectDialog";
import ProjectsGrid from "@/components/project-comps/ProjectsGrid";
import ProjectsGridSkeleton from "@/components/project-comps/ProjectsGridSkeleton";
import { Project } from "@/types/project";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const ProjectsPage: React.FC = () => {
  const [gridLoader, setGridLoader] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const refreshProjects = async (): Promise<void> => {
    setGridLoader(true);
    await fetchAllProjects();
  };

  const fetchAllProjects = async (): Promise<void> => {
    try {
      const { data } = await axios.get<ApiResponse<Project[]>>("/api/projects");

      if (data?.success && Array.isArray(data.data)) {
        setProjects(data.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(
          error.response?.data?.message ||
            error.message ||
            "Error fetching projects",
          { type: "error" }
        );
      } else {
        toast("Unexpected error occurred", { type: "error" });
      }
    } finally {
      setGridLoader(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  let projectContent;
  if (gridLoader) {
    projectContent = (
      <div className="w-full grid grid-cols-4 gap-7">
        <ProjectsGridSkeleton />
      </div>
    );
  } else if (projects.length > 0) {
    projectContent = (
      <div className="w-full grid grid-cols-4 gap-7">
        <ProjectsGrid projects={projects} refreshProjects={refreshProjects} />
      </div>
    );
  } else {
    projectContent = (
      <div className="w-full h-full pt-32 flex flex-col items-center justify-center text-sm italic">
        No Projects
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 p-7">
      <div className="w-full flex items-center justify-between">
        <h2 className="prose text-2xl">Projects</h2>
        <button
          type="button"
          className="btn btn-primary rounded"
          onClick={() =>
            (
              document.getElementById(
                "create_project_modal"
              ) as HTMLDialogElement
            )?.showModal()
          }
        >
          + New project
        </button>
      </div>

      {projectContent}

      <CreateProjectDialog refreshProjects={refreshProjects} />
    </div>
  );
};

export default ProjectsPage;
