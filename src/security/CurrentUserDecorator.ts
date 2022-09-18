import { Action } from "routing-controllers";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "./../models/User";

export class CurrentUserDecorator {
  static checkCurrentUser(action: Action): Promise<User | null> {
    const jwtData = action.request.jwtData;
    const userId = jwtData.tokePayload.id;

    return UserRepository.findOneBy({ id: userId });
  }
}
