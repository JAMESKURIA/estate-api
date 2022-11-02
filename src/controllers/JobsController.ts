import { Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/jobs")
export class JobController {
  @Post("/create")
  async createJob() {}

  @Post("/cancel")
  async cancelJob() {}

  @Get()
  async getAllJobs() {}

  @Get("/:id")
  async getJob(@Param("id") jobId: string) {}

  @Post("/:id")
  async updateJob(@Param("id") jobId: string) {}
}
