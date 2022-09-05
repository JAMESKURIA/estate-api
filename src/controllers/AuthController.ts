import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";
import { LoginBodyDto } from "../dto/loginBodyDto";
import { LoginResponseDto } from "../dto/loginResponseDto";
import { RegisterBodyDto } from "../dto/registerBodyDto";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";
import { AUTH_SERVICE_IMPL } from "../services/impl/AuthServiceImpl";
import { USER_SERVICE_IMPL } from "../services/impl/userServiceImpl";
import { UserService } from "../services/userService";

@JsonController("/auth")
@Service()
export class AuthController {
  @Inject(USER_SERVICE_IMPL)
  private readonly userService!: UserService;

  @Inject(AUTH_SERVICE_IMPL)
  private readonly authService!: AuthService;

  @OpenAPI({ summary: "Log in user" })
  @Post("/login")
  @ResponseSchema(LoginResponseDto)
  public loginUser(@Body() loginBody: LoginBodyDto) {
    return this.authService.loginUser(loginBody);
  }

  @OpenAPI({ summary: "Create a new user" })
  @ResponseSchema(User)
  @Post()
  public createUser(@Body() reqBody: RegisterBodyDto) {
    return this.authService.registerUser(reqBody);
  }
}
