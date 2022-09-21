import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleName } from "../enums/UserRoleEnums";
import { Login } from "./Login";

@Entity("user_roles")
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_role_id" })
  id!: string;

  @Column({
    type: "enum",
    enum: RoleName,
    default: RoleName.CLIENT,
    name: "user_role_name",
  })
  name!: RoleName;

  @OneToMany((type) => Login, (login) => login.role)
  logins!: Login[];
}
