import { TaskStatus } from "./task-status.enum";

export class Task {
  id: string;
  status: TaskStatus;
  description: string;
  createdAt: Date;
  completedAt: Date;

  finishTask = () => {
    this.completedAt = new Date(Date.now());
    this.status = TaskStatus.Finished;
  }

  restartTask = () => {
    this.completedAt = new Date(0);
    this.status = TaskStatus.Unfinished;
  }

  constructor(id:string, description:string){
    this.id = id;
    this.description = description;

    this.createdAt = new Date(Date.now());
    this.completedAt = new Date(0);
    this.status = TaskStatus.Unfinished;
  }
}
