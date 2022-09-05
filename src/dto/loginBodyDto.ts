import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginBodyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(4, 30)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  password!: string;
}
