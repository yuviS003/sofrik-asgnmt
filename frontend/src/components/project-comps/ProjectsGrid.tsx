import { Project } from "@/types/project";
import React, { useState } from "react";
import DeleteProjectDialog from "./DeleteProjectDialog";
import EditProjectDialog from "./EditProjectDialog";
import { useRouter } from "next/navigation";

interface ProjectsGridProps {
  projects: Project[];
  refreshProjects: () => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  refreshProjects,
}) => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects.length)
    return (
      <div className="w-full flex flex-col items-center justify-center">
        No projects found
      </div>
    );
  return (
    <>
      {projects.map((project) => (
        <div
          key={project?.id || project?._id}
          className="card card-border bg-base-300 w-full border-gray-700 relative"
        >
          <div className="card-body">
            <div className="w-full flex items-center justify-between gap-2">
              <h2 className="card-title line-clamp-1">{project.title}</h2>
              <span
                className={`badge badge-dash capitalize ${
                  project.status === "active"
                    ? "badge-success"
                    : "badge-secondary"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="min-h-16 line-clamp-3">{project.description}</p>
            <div className="card-actions justify-end">
              <button
                type="button"
                title="View Tasks"
                onClick={() => {
                  router.push(
                    `/dashboard/projects/${project?.id || project?._id}`
                  );
                }}
                className="btn btn-sm btn-primary rounded-box"
              >
                View Tasks
              </button>
              <button
                type="button"
                className="btn btn-square"
                title="Edit"
                onClick={() => {
                  setSelectedProject(project);
                  (
                    document.getElementById(
                      "update_project_modal"
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
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
                    d="M16.862 4.487l1.651 1.651a1.5 1.5 0 010 2.121l-9.193 9.193a1.5 1.5 0 01-.53.34l-4.303 1.435a.375.375 0 01-.47-.47l1.435-4.303a1.5 1.5 0 01.34-.53l9.193-9.193a1.5 1.5 0 012.121 0z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="btn btn-square"
                title="Delete"
                onClick={() => {
                  setSelectedProject(project);
                  (
                    document.getElementById(
                      "delete_project_modal"
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
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
                    d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h10l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      <EditProjectDialog
        selectedProject={selectedProject}
        refreshProjects={refreshProjects}
      />
      <DeleteProjectDialog
        selectedProject={selectedProject}
        refreshProjects={refreshProjects}
      />
    </>
  );
};

export default ProjectsGrid;
