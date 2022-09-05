import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IsUnique } from "../validators/IsUnique";
import { LoginBodyDto } from "./loginBodyDto";

export class RegisterBodyDto extends LoginBodyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(4, 30)
  @IsUnique({ message: "Email is already taken" })
  override email!: string;

  @IsString()
  @IsNotEmpty()
  fname!: string;

  @IsString()
  @IsNotEmpty()
  otherNames!: string;
}
