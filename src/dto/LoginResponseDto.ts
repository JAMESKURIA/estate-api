import { IsString } from "class-validator";
import { UserRole } from "./../models/UserRole";

export class LoginResponseDto {
  @IsString()
  accessToken!: string;

  @IsString()
  refreshToken!: string;

  @IsString()
  role!: UserRole;
}
