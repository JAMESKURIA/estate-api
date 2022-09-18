import { Body, BodyParam, JsonController, Post } from "routing-controllers";
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
  public loginUser(@Body() loginBody: LoginBodyDto) {
    return this.authService.loginUser(loginBody);
  }

  @OpenAPI({ summary: "Create a new user" })
  @ResponseSchema(User)
  @Post("/register")
  public createUser(@Body() reqBody: RegisterBodyDto) {
    return this.authService.registerUser(reqBody);
  }

  @OpenAPI({ summary: "Generate a new access token" })
  @ResponseSchema(RefreshTokenResponse)
  @Post("/refreshToken")
  public refreshToken(@BodyParam("token", { required: true }) token: string) {
    return this.authService.refreshToken(token);
  }
}
