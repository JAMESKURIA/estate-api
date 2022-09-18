import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { LoginRepository } from "../repositories/LoginRepository";

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  private readonly loginRepository = LoginRepository;

  async validate(value: any, args: ValidationArguments) {
    let user;

    switch (args.property) {
      case "email":
        user = await this.loginRepository.findOneBy({ email: value });
        break;

      default:
        break;
    }

    // get records that equal the `args.property` value from DB.

    if (user) return false;

    // If exist the `args.property` value in target table, return false. (unique validation error)
    return true;
  }
}
