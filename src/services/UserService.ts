import { RoleName } from "../enums/UserRoleEnums";
import { User } from "../models/User";
import { UserRole } from "../models/UserRole";

export interface UserService {
  getAllUsers(): Promise<User[]>;

  getUserbyId(id: string): Promise<User | null>;

  getUserRoleByName(name: RoleName): Promise<UserRole | null>;
}
