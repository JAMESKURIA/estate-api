import bcrypt from "bcrypt";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Login } from "../models/Login";

@EventSubscriber()
export class LoginSubscriber implements EntitySubscriberInterface<Login> {
  listenTo() {
    return Login;
  }

  // afterLoad(entity: Login) {
  //   console.log(`AFTER ENTITY LOADED: `, entity);
  // }

  async beforeInsert(event: InsertEvent<Login>) {
    const password: string = event.entity.password;

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    event.entity.password = hashedPassword;

    event.entity.id = uuidv4();
  }
}
