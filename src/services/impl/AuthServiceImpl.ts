import { compare } from "bcrypt";
import { validateOrReject } from "class-validator";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "routing-controllers";
import { Service } from "typedi";
import { LoginBodyDto } from "../../dto/loginBodyDto";
import { LoginResponseDto } from "../../dto/loginResponseDto";
import { RegisterBodyDto } from "../../dto/registerBodyDto";
import { User } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";
import { JwtUtils } from "../../security/JwtUtils";
import { AuthService } from "../AuthService";

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

    const token = JwtUtils.generateAccessToken(user);

    return { token };
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
}
