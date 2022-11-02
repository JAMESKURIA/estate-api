import { NotFoundError } from "routing-controllers";
import signale from "signale";
import { Service } from "typedi";
import { User } from "../../models/User";
import { UserRole } from "../../models/UserRole";
import { UserRepository } from "../../repositories/UserRepository";
import { UserRoleRepository } from "../../repositories/UserRoleRepository";
import { UserService } from "../UserService";
import { RoleName } from "./../../enums/UserRoleEnums";

export const USER_SERVICE_IMPL = "UserServiceImpl";

@Service(USER_SERVICE_IMPL)
export class UserServiceImpl implements UserService {
  public async getAllUsers(): Promise<User[]> {
    return await UserRepository.find({
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
  }

  public async getUserbyId(id: string): Promise<User | null> {
    const user = UserRepository.findOneBy({ id });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  async getUserRoleByName(name: RoleName): Promise<UserRole | null> {
    signale.log({ name });

    return await UserRoleRepository.findOneBy({
      name,
    });
  }
}
