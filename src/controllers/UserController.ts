import {
  Authorized,
  Get,
  JsonController,
  UseBefore,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";
import { User } from "../models/User";
import passportJwtMiddleware from "../security/passportJwtMiddleware";
import { USER_SERVICE_IMPL } from "../services/impl/userServiceImpl";
import { UserService } from "../services/UserService";

// @OpenAPI({
//   security: [{ basicAuth: [] }],
// })

@UseBefore(passportJwtMiddleware)
@Authorized()
@JsonController("/users")
@Service()
export class UserController {
  @Inject(USER_SERVICE_IMPL)
  private readonly userService!: UserService;

  @OpenAPI({
    summary: "Return a list of users",
    responses: {
      "500": {
        description: "Internal server Error",
      },
    },
  })
  @ResponseSchema(User, { isArray: true, statusCode: 200 })
  @Get()
  public getAllUsers() {
    return this.userService.getAllUsers();
  }
}
