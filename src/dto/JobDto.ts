import { Task } from "../models/Task";
import { User } from "../models/User";

export class JobDto {
  description!: string;

  date!: Date;

  time!: string;

  user!: User;

  task!: Task;
}
