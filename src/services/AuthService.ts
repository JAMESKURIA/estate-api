import { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { LoginBodyDto } from "./../dto/loginBodyDto";
import { LoginResponseDto } from "./../dto/loginResponseDto";
import { RegisterBodyDto } from "./../dto/registerBodyDto";
export interface AuthService {
  loginUser(loginDetails: LoginBodyDto): Promise<LoginResponseDto>;

  registerUser(registerDetails: RegisterBodyDto): Promise<User>;

  refreshToken(token: string): JwtPayload | any;
}
