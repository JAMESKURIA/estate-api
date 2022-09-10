import { instanceToPlain } from "class-transformer";
import "dotenv/config";

import { Secret, sign } from "jsonwebtoken";
import { User } from "../models/User";

export class JwtUtils {
  static generateAccessToken(user: User) {
    return sign(
      instanceToPlain(user),
      process.env.ACCESS_TOKEN_SECRET as Secret,
      {
        expiresIn: "30s",
      }
    );
  }

  static generateRefreshToken({
    tokenId,
    user,
  }: {
    tokenId: string;
    user: User;
  }) {
    return sign(
      { tokenId, user: { ...user } },
      process.env.REFRESH_TOKEN_SECRET as Secret
    );
  }
}
