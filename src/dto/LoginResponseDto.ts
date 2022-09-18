import { IsString } from "class-validator";

export class LoginResponseDto {
  @IsString()
  accessToken!: string;

  @IsString()
  refreshToken!: string;
}
