import { IsString, IsUUID } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Job } from "./Job";
import { Login } from "./Login";
import { SubLocation } from "./SubLocation";

@Entity("users")
export class User extends BaseEntity {
  @IsUUID()
  @PrimaryColumn("uuid", { name: "user_id" })
  @IsString()
  id?: string;

  @Column("varchar", { length: 255, name: "user_fname" })
  @IsString()
  fname!: string;

  @Column("varchar", { length: 255, name: "user_onames" })
  @IsString()
  otherNames!: string;

  @OneToOne(() => Login, (login) => login.user)
  @JoinColumn({ name: "user_login_id" })
  login?: Login;

  @ManyToOne(() => SubLocation, (subLocation) => subLocation.users)
  @JoinColumn({ name: "user_sub_location_id" })
  subLocation!: SubLocation;

  @ManyToMany(() => Job, (job) => job.users)
  jobs?: Job[];
}
