import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Job } from "../models/Job";

@EventSubscriber()
export class JobSubscriber implements EntitySubscriberInterface<Job> {
  listenTo() {
    return Job;
  }

  async beforeInsert(event: InsertEvent<Job>) {
    event.entity.id = uuidv4();
  }
}
