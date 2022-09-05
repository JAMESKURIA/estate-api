import { Exclude } from "class-transformer";
import { IsEmail, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @IsUUID()
  @PrimaryColumn("uuid", { name: "user_id" })
  @IsString()
  id!: string;

  @Column("varchar", { name: "user_first_name" })
  @IsString()
  fname!: string;

  @Column("varchar", { name: "user_other_names" })
  @IsString()
  otherNames!: string;

  @Column("varchar", { length: 30, name: "user_email", unique: true })
  @IsEmail()
  @IsString()
  email!: string;

  @Exclude()
  @Column("text", { name: "user_password" })
  @IsString()
  password!: string;

  getFullName() {
    return this.fname + " " + this.otherNames;
  }
}
