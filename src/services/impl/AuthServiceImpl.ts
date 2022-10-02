import { compare } from "bcrypt";
import { validateOrReject } from "class-validator";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";
import { SubLocationRepo } from "../../repositories/SubLocationRepo";
import { UserRepository } from "./../../repositories/UserRepository";
// import signale from "signale";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { LoginBodyDto } from "../../dto/LoginBodyDto";
import { LoginResponseDto } from "../../dto/LoginResponseDto";
import { RegisterBodyDto } from "../../dto/RegisterBodyDto";
import { User } from "../../models/User";
import { LoginRepository } from "../../repositories/LoginRepository";
import { TokenRepository } from "../../repositories/TokenRepository";
import { JwtUtils } from "../../security/JwtUtils";
import { AuthService } from "../AuthService";

export const AUTH_SERVICE_IMPL = "AuthServiceImpl";

@Service(AUTH_SERVICE_IMPL)
export class AuthServiceImpl implements AuthService {
  private readonly loginRepo = LoginRepository;

  public async loginUser(
    loginDetails: LoginBodyDto
  ): Promise<LoginResponseDto> {
    await validateOrReject(loginDetails);

    const user = await this.loginRepo.findOneBy({ email: loginDetails.email });

    if (!user) throw new NotFoundError("User not found");

    // compare password
    const passwordsMatch = await compare(loginDetails.password, user.password);

    if (!passwordsMatch) throw new BadRequestError("Incorrect password");

    const tokenId = uuidv4();

    const accessToken = JwtUtils.generateAccessToken(user.user);
    const refreshToken = JwtUtils.generateRefreshToken({
      tokenId,
      user: user.user,
    });

    // Save token to database
    TokenRepository.save({ id: tokenId, token: refreshToken });

    return { accessToken, refreshToken };
  }

  public async registerUser(userDetails: RegisterBodyDto): Promise<User> {
    await validateOrReject(userDetails);

    const { subLocationId, email, password, ..._user } = userDetails;

    const subLocation = await SubLocationRepo.findOneBy({
      id: subLocationId,
    });

    if (!subLocation) throw new BadRequestError("Sublocation does not exist!");

    const savedLogin = await LoginRepository.save({ email, password });

    const savedUser = await UserRepository.save({
      login: savedLogin,
      subLocation,
      ..._user,
    });

    console.log("Saved User: ", savedUser);

    return savedUser;
  }

  public refreshToken(token: string) {
    // verify token
    return verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (err, payload) => {
        if (err) throw new UnauthorizedError("Token is invalid");

        const id: string = (payload as JwtPayload).tokenId;

        const savedToken = await TokenRepository.findOneBy({ id });

        if (!savedToken) throw new ForbiddenError("Token unidentified");

        // signale.log("Saved Token", savedToken);

        if (savedToken.token !== token)
          throw new ForbiddenError("Invalid Token");

        const user: User = (payload as JwtPayload).user;

        return { accessToken: JwtUtils.generateAccessToken(user) };
      }
    );
  }
}
