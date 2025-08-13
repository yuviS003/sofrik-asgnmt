export type ProjectStatus = "active" | "completed";

export interface Project {
  id: string;
  _id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
