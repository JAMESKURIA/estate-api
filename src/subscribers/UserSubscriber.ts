import bcrypt from "bcrypt";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  // afterLoad(entity: User) {
  //   console.log(`AFTER ENTITY LOADED: `, entity);
  // }

  async beforeInsert(event: InsertEvent<User>) {
    

    event.entity.id = uuidv4();
  }
}
