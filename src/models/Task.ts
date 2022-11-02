import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "./Job";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { name: "task_id" })
  id!: number;

  @Column("varchar", { length: 255, name: "task_name" })
  name!: string;

  @OneToMany(() => Job, (job) => job.task)
  jobs!: Job[];
}
