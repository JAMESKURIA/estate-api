import "dotenv/config";

import { Secret, sign } from "jsonwebtoken";
import { User } from "../models/User";

export class JwtUtils {
  static generateAccessToken(user: User) {
    return sign({ ...user }, process.env.ACCESS_TOKEN_SECRET as Secret);
  }

  static generateRefreshToken(user: User) {
    return sign({ ...user }, process.env.REFRESH_TOKEN_SECRET as Secret);
  }
}
