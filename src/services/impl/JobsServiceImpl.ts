import { Service } from "typedi";
import { Job } from "../../models/Job";
import { JobsService } from "../JobsService";

export const JOB_SERVICE_IMPL = "JOB_SERVICE_IMPL";

@Service(JOB_SERVICE_IMPL)
export class JobsServiceImpl implements JobsService {
  getJobs(): Promise<Job[]> {
    throw new Error("Method not implemented.");
  }
  getJobById(id: string): Promise<Job | null> {
    throw new Error("Method not implemented.");
  }
  updateJob(id: string): Promise<Job> {
    throw new Error("Method not implemented.");
  }
  cancelJob(id: string): Promise<Job> {
    throw new Error("Method not implemented.");
  }
  createJob(): Promise<Job> {
    throw new Error("Method not implemented.");
  }
}
