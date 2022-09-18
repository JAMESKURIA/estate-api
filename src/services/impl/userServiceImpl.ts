import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../UserService";

export const USER_SERVICE_IMPL = "UserServiceImpl";

@Service(USER_SERVICE_IMPL)
export class UserServiceImpl implements UserService {
  private readonly userRepo = UserRepository;

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  public async getUserbyId(id: string): Promise<User | null> {
    const user = this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }
}
