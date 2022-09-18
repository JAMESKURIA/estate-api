import { compare } from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { BadRequestError, InternalServerError } from "routing-controllers";
import signale from "signale";
import { LoginRepository } from "../repositories/LoginRepository";

export default new LocalStrategy(
  {
    usernameField: "email",
  },
  async (
    email: string,
    password: string,
    done: (error: any, user?: any) => void
  ) => {
    try {
      const user = await LoginRepository.findOneBy({ email });

      if (!user) return done(new BadRequestError("Email does not exist"), null);

      const passworsMatch = await compare(password, user.password);

      if (!passworsMatch)
        return done(new BadRequestError("Password is incorrect"), null);

      return done(null, user);
    } catch (error) {
      signale.error("Unknown error occurred");
      done(
        new InternalServerError("Unknown error occured loginstrategy"),
        null
      );
    }
  }
);
