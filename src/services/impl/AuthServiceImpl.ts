import { compare } from "bcrypt";
import { validateOrReject } from "class-validator";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";
// import signale from "signale";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { LoginBodyDto } from "../../dto/loginBodyDto";
import { LoginResponseDto } from "../../dto/loginResponseDto";
import { RegisterBodyDto } from "../../dto/registerBodyDto";
import { User } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";
import { JwtUtils } from "../../security/JwtUtils";
import { AuthService } from "../AuthService";
import { TokenRepository } from "./../../repository/TokenRepository";

export const AUTH_SERVICE_IMPL = "AuthServiceImpl";

@Service(AUTH_SERVICE_IMPL)
export class AuthServiceImpl implements AuthService {
  private readonly userRepo = UserRepository;

  public async loginUser(
    loginDetails: LoginBodyDto
  ): Promise<LoginResponseDto> {
    await validateOrReject(loginDetails);

    const user = await this.userRepo.findOneBy({ email: loginDetails.email });

    if (!user) throw new NotFoundError("User not found");

    // compare password
    const passwordsMatch = await compare(loginDetails.password, user.password);

    if (!passwordsMatch) throw new BadRequestError("Incorrect password");

    const tokenId = uuidv4();

    const accessToken = JwtUtils.generateAccessToken(user);
    const refreshToken = JwtUtils.generateRefreshToken({ tokenId, user });

    // Save token to database
    TokenRepository.save({ id: tokenId, token: refreshToken });

    return { accessToken, refreshToken };
  }

  public async registerUser(userDetails: RegisterBodyDto): Promise<User> {
    try {
      await validateOrReject(userDetails);

      const savedUser = await this.userRepo.save(userDetails);

      return savedUser;
    } catch (error) {
      throw new InternalServerError("Internal Server error");
    }
  }

  public refreshToken(token: string) {
    // verify token
    return verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (err, payload) => {
        if (err) throw new UnauthorizedError("Token is invalid");

        try {
          const id: string = (payload as JwtPayload).tokenId;

          const savedToken = await TokenRepository.findOneBy({ id });

          if (!savedToken) throw new ForbiddenError("Token unidentified");

          // signale.log("Saved Token", savedToken);

          if (savedToken.token !== token)
            throw new ForbiddenError("Invalid Token");

          const user: User = (payload as JwtPayload).user;

          return { accessToken: JwtUtils.generateAccessToken(user) };
        } catch (error) {
          throw new InternalServerError("an error occurred (token)");
        }
      }
    );
  }
}
