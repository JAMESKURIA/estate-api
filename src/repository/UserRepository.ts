import { Repository } from "typeorm";
import dataSource from "../data-source";
import { User } from "../models/User";

export const UserRepository: Repository<User> = dataSource.getRepository(User);

// import {EntityRepository, Repository} from "typeorm";

// import {Service} from "typedi";
// import { User } from "../models/User";

// @Service()
// @EntityRepository(User)
// export default class TodoRepository extends Repository<User> {}
