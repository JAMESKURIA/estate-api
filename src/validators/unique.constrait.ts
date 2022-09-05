import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { UserRepository } from "./../repository/UserRepository";

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  private readonly userRepository = UserRepository;

  async validate(value: any, args: ValidationArguments) {
    let user;

    switch (args.property) {
      case "email":
        user = await this.userRepository.findOneBy({ email: value });
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
