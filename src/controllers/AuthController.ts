import { validateOrReject } from "class-validator";
import { Response } from "express";
import {
  Body,
  CookieParam,
  Get,
  JsonController,
  Post,
  Res,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";
import { LoginBodyDto } from "../dto/LoginBodyDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { RefreshTokenResponse } from "../dto/RefreshTokenResponse";
import { RegisterBodyDto } from "../dto/RegisterBodyDto";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";
import { AUTH_SERVICE_IMPL } from "../services/impl/AuthServiceImpl";
import { USER_SERVICE_IMPL } from "../services/impl/userServiceImpl";
import { UserService } from "../services/UserService";

@JsonController("/auth")
@Service()
export class AuthController {
  @Inject(USER_SERVICE_IMPL)
  private readonly userService!: UserService;

  @Inject(AUTH_SERVICE_IMPL)
  private readonly authService!: AuthService;

  // @UseBefore(passportLoginMiddleware)
  @OpenAPI({ summary: "Log in user" })
  @ResponseSchema(LoginResponseDto)
  @Post("/login")
  public async loginUser(
    @Res() res: Response,
    @Body() loginBody: LoginBodyDto
  ) {
    await validateOrReject(loginBody);

    const { accessToken, refreshToken, role } =
      await this.authService.loginUser(loginBody);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, role: role.name });

    return res;
  }

  @OpenAPI({ summary: "Create a new user" })
  @ResponseSchema(User)
  @Post("/register")
  public createUser(@Body({ required: true }) reqBody: RegisterBodyDto) {
    return this.authService.registerUser(reqBody);
  }

  @OpenAPI({ summary: "Generate a new access token" })
  @ResponseSchema(RefreshTokenResponse)
  @Get("/refreshToken")
  public refreshToken(@CookieParam("jwt", { required: true }) token: string) {
    return this.authService.refreshToken(token);
  }

  @OpenAPI({
    summary: "Logout user",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  @Post("/logout")
  public async logout(@CookieParam("jwt") token: string, @Res() res: Response) {
    if (!token) return res.sendStatus(204);

    await this.authService.logout(token);

    // Remove token from cookies in the frontend
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.sendStatus(204);
  }
}
