import { IsString } from "class-validator";

export class LoginResponseDto {
  @IsString()
  token!: string;
}
