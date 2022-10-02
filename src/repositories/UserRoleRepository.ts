import { Repository } from "typeorm";
import dataSource from "../data-source";
import { UserRole } from "../models/UserRole";

export const UserRoleRepository: Repository<UserRole> = dataSource.getRepository(UserRole);

// import {EntityRepository, Repository} from "typeorm";

// import {Service} from "typedi";
// import { User } from "../models/User";

// @Service()
// @EntityRepository(User)
// export default class TodoRepository extends Repository<User> {}
