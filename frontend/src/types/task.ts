export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  projectId: string;
  userId: string;
  assignedUserId: string | null;
  createdAt: string;
  updatedAt: string;
}
