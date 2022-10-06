import { Action, UnauthorizedError } from "routing-controllers";
import { UserRepository } from "../repositories/UserRepository";

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
      const user = await UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          login: {
            role: true,
          },
        },
        select: {
          login: {
            email: true,
            role: {
              name: true,
            },
          },
        },
      });

      if (user && !roles.length) {
        return true;
      }

      // Query user roles
      if (user && roles.indexOf(user.login?.role?.name as string) !== -1) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
