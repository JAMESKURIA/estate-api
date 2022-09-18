import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("increment", { name: "task_id" })
  id!: number;

  @Column("varchar", { length: 255, name: "task_name" })
  name!: string;

  @OneToMany(() => Job, (job) => job.tasks)
  jobs!: Job[];
}
