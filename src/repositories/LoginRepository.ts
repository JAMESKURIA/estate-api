import { Repository } from "typeorm";
import dataSource from "../data-source";
import { Login } from "../models/Login";

export const LoginRepository: Repository<Login> = dataSource
  .getRepository(Login)
  .extend({
    // Get login by email
    findByEmail(email: string) {
      return this.createQueryBuilder("login")
        .where("login.email = :email", { email })
        .getOne();
    },
  });
