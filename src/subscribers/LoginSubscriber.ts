import bcrypt from "bcrypt";
import { Service } from "typedi";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { RoleName } from "../enums/UserRoleEnums";
import { Login } from "../models/Login";
import { UserRole } from "../models/UserRole";
import { UserRoleRepository } from "../repositories/UserRoleRepository";

@Service()
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

    const userRole = await UserRoleRepository.findOneBy({
      name: RoleName.CLIENT,
    });

    if (!userRole) return;

    event.entity.role =
      event.entity.role === undefined
        ? (userRole as UserRole)
        : (event.entity.role as UserRole);
  }
}
