import { JwtPayload } from "jsonwebtoken";
import { LoginBodyDto } from "../dto/LoginBodyDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { RegisterBodyDto } from "../dto/RegisterBodyDto";
import { User } from "../models/User";
export interface AuthService {
  loginUser(loginDetails: LoginBodyDto): Promise<LoginResponseDto>;

  registerUser(registerDetails: RegisterBodyDto): Promise<User>;

  refreshToken(token: string): JwtPayload | any;
}
