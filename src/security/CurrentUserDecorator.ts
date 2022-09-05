import { Action } from "routing-controllers";
import { User } from "./../models/User";
import { UserRepository } from "./../repository/UserRepository";

export class CurrentUserDecorator {
  static checkCurrentUser(action: Action): Promise<User | null> {
    const jwtData = action.request.jwtData;
    const userId = jwtData.tokePayload.id;

    return UserRepository.findOneBy({ id: userId });
  }
}
