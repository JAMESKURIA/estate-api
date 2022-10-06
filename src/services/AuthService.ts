import { JwtPayload } from "jsonwebtoken";
import { LoginBodyDto } from "../dto/LoginBodyDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { RegisterBodyDto } from "../dto/RegisterBodyDto";
import { RefreshToken } from "../models/RefreshToken";
import { User } from "../models/User";
export interface AuthService {
  loginUser(loginDetails: LoginBodyDto): Promise<LoginResponseDto>;

  registerUser(registerDetails: RegisterBodyDto): Promise<User>;

  verifyToken(
    token: string
  ): Promise<{ payload: string | JwtPayload | undefined }>;

  refreshToken(token: string): JwtPayload | any;

  getRefreshToken(id: string): Promise<RefreshToken | null>;

  invalidateRefreshToken(id: string): Promise<void>;

  logout(token: string): Promise<void>;
}
