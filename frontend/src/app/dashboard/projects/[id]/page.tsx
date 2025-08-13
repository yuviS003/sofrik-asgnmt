"use client";
import CreateTaskDialog from "@/components/project-by-id-comps/CreateTaskDialog";
import ProjectTaskList from "@/components/project-by-id-comps/ProjectTaskList";
import { Project } from "@/types/project";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProjectByIdPage = () => {
  const { id } = useParams();
  const projectId = id as string;
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [projectTasks, setProjectTasks] = useState<any[]>([]);

  const refreshProject = () => {
    fetchProjectDetails();
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/?id=${projectId}`);
      console.log("response", response);
      if (response?.status === 200) {
        setProjectDetails(response?.data);
        if (response?.data?.tasks && Array.isArray(response?.data?.tasks)) {
          setProjectTasks(response?.data?.tasks);
        }
      }
    } catch (error: any) {
      toast(
        error.response?.data?.message ||
          error.message ||
          "Error fetching project details",
        { type: "error" }
      );
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);
  return (
    <>
      <div className="w-full flex flex-col gap-5 p-7">
        <div className="w-full flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-sm btn-ghost btn-circle rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h2 className="text-2xl">Project ID: {projectId}</h2>
          <button
            type="button"
            onClick={() => {
              (
                document.getElementById(
                  "create_task_dialog"
                ) as HTMLDialogElement
              )?.showModal();
            }}
            className="btn btn-sm rounded-box btn-primary ml-auto"
          >
            + Add a task
          </button>
        </div>
        {projectDetails && (
          <div className="w-full flex flex-col">
            <h2 className="text-2xl">{projectDetails?.title}</h2>
            <p>{projectDetails?.description}</p>
            <ProjectTaskList tasks={projectTasks} refresh={refreshProject} />
          </div>
        )}
      </div>
      <CreateTaskDialog projectId={projectId ?? ""} refresh={refreshProject} />
    </>
  );
};

export default ProjectByIdPage;
