import { Action, UnauthorizedError } from "routing-controllers";
import { UserRepository } from "../repositories/UserRepository";

const userRepo = UserRepository;

export class RoleAuthorization {
  static async checkAuthorization(
    action: Action,
    roles: string[]
  ): Promise<any> {
    const jwtData = action.request.jwtData;

    if (!jwtData) {
      throw new UnauthorizedError();
    }

    const userId = jwtData.tokenPayload.id;

    try {
      const user = await userRepo.findOneBy({ id: userId });

      if (user && !roles.length) {
        return true;
      }

      // TODO: Query user roles
      // if (user && (roles.indexOf(user.role) !== -1)) {
      //     return true;
      //   }

      return false;
    } catch (error) {
      return false;
    }
  }
}
