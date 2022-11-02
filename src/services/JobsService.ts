import { Job } from "../models/Job";

export interface JobsService {
  getJobs(): Promise<Job[]>;

  getJobById(id: string): Promise<Job | null>;

  updateJob(id: string): Promise<Job>;

  cancelJob(id: string): Promise<Job>;

  createJob(): Promise<Job>;
}
