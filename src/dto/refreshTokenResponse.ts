import { IsString } from "class-validator";
export class RefreshTokenResponse {
  @IsString()
  accessToken!: string;
}
