import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { JobStatus } from "../enums/JobEnums";
import { Task } from "./Task";
import { User } from "./User";

@Entity("jobs")
export class Job {
  @PrimaryColumn("uuid", { name: "job_id" })
  id!: string;

  @Column("varchar", { length: 255, name: "job_description" })
  description!: string;

  @Column("date", { name: "job_date_scheduled" })
  date!: string;

  @Column("time", { name: "job_time_scheduled" })
  time!: string;

  @Column("enum", {
    enum: JobStatus,
    default: JobStatus.PENDING,
    name: "job_status",
  })
  status!: JobStatus;

  @ManyToMany(() => User, (user) => user.jobs)
  @JoinTable({
    name: "user_jobs",
    joinColumn: {
      name: "job_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  users!: User;

  @ManyToOne(() => Task, (task) => task.jobs)
  @JoinColumn({ name: "job_task_id" })
  tasks!: Task[];
}
