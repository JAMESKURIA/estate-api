import { User } from "../models/User";

export interface UserService {
  getAllUsers(): Promise<User[]>;

  getUserbyId(id: string): Promise<User | null>;
}
