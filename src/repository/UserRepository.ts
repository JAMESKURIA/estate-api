import { Repository } from "typeorm";
import dataSource from "../data-source";
import { User } from "../models/User";

export const UserRepository: Repository<User> = dataSource.getRepository(User);
