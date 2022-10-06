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
import { UserRole } from "./../../models/UserRole";
import { UserRepository } from "./../../repositories/UserRepository";
// import signale from "signale";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { LoginBodyDto } from "../../dto/LoginBodyDto";
import { LoginResponseDto } from "../../dto/LoginResponseDto";
import { RegisterBodyDto } from "../../dto/RegisterBodyDto";
import { RefreshToken } from "../../models/RefreshToken";
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
    const login = await this.loginRepo.findOne({
      where: {
        email: loginDetails.email,
      },
      relations: {
        user: true,
        role: true,
      },
      select: {
        role: {
          name: true,
        },
      },
    });

    if (!login) throw new NotFoundError("User not found");

    // compare password
    const passwordsMatch = await compare(loginDetails.password, login.password);

    if (!passwordsMatch) throw new BadRequestError("Incorrect password");

    const tokenId = uuidv4();

    const accessToken = JwtUtils.generateAccessToken(login.user);

    const refreshToken = JwtUtils.generateRefreshToken({
      tokenId,
      user: login.user,
    });

    // Save token to database
    TokenRepository.save({ id: tokenId, token: refreshToken, valid: true });

    return { accessToken, refreshToken, role: login.role as UserRole };
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

    return savedUser;
  }

  public async getRefreshToken(id: string): Promise<RefreshToken | null> {
    return await TokenRepository.findOneBy({ id });
  }

  public async verifyToken(token: string): Promise<any> {
    return verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (err, payload) => {
        if (err) throw new UnauthorizedError("Token is invalid");

        const id: string = (payload as JwtPayload).tokenId;

        const savedToken = await this.getRefreshToken(id);

        if (!savedToken) throw new UnauthorizedError("Token unidentified");

        // signale.log("Saved Token", savedToken);
        if (!savedToken.valid) throw new UnauthorizedError();

        if (savedToken.token !== token)
          throw new ForbiddenError("Invalid Token");

        return payload;
      }
    );
  }

  public async refreshToken(token: string) {
    // verify token
    const payload = await this.verifyToken(token);

    const user: User = (payload as JwtPayload).user;

    return { accessToken: JwtUtils.generateAccessToken(user) };
  }

  public async invalidateRefreshToken(id: string): Promise<void> {
    const token = await this.getRefreshToken(id);

    if (!token) throw new UnauthorizedError("Invalidate refresh token");

    TokenRepository.save({ ...token, valid: false });
  }

  public async logout(token: string): Promise<void> {
    // TODO: Invalidate the saved token
    const payload = await this.verifyToken(token);

    await this.invalidateRefreshToken(payload?.tokenId);
  }
}
