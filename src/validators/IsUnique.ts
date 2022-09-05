import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueConstraint } from "./unique.constrait";

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
