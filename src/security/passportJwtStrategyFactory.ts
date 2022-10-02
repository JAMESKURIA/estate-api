// import { cookie } from 'cookie';
import {
  ExtractJwt,
  JwtFromRequestFunction,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { UserRepository } from "../repositories/UserRepository";
import { VerifiedCallback } from "./../../node_modules/@types/passport-jwt/index.d";

interface PassportJwtStrategyFactoryOptions {
  name?: String;
  extractJwtFromCookie?: Boolean;
  extractJwtFromAuthHeaderWithScheme?: Boolean;
  extractJwtFromUrlQueryParameter?: Boolean;
  fromAuthHeaderAsBearerToken?: Boolean;
}

const userRepo = UserRepository;

function passportJwtStrategyFactory({
  name = "jwt",
  fromAuthHeaderAsBearerToken = true,
  extractJwtFromCookie = false,
  extractJwtFromAuthHeaderWithScheme = false,
  extractJwtFromUrlQueryParameter = false,
}: PassportJwtStrategyFactoryOptions = {}) {
  const jwtFromRequestLayers: JwtFromRequestFunction[] = [];

  if (extractJwtFromCookie) {
    jwtFromRequestLayers.push(
      (req) => req.cookies?.token
      // [req, typeof req.headers.cookie === "string"].every(Boolean) &&
      //    (cookie.parse(req.headers.cookie).token);
    );
  }

  if (extractJwtFromAuthHeaderWithScheme) {
    jwtFromRequestLayers.push(ExtractJwt.fromAuthHeaderWithScheme("jwt"));
  }

  if (extractJwtFromUrlQueryParameter) {
    jwtFromRequestLayers.push(ExtractJwt.fromUrlQueryParameter("jwt"));
  }

  if (fromAuthHeaderAsBearerToken) {
    jwtFromRequestLayers.push(ExtractJwt.fromAuthHeaderAsBearerToken());
  }

  const jwtFromRequest: JwtFromRequestFunction = (request) => {
    let token = null;

    for (const layer of jwtFromRequestLayers) {
      token = layer(request);

      if (token) break;
    }

    return token;
  };

  const opts: StrategyOptions = {
    jwtFromRequest,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  };

  const verify: VerifiedCallback = async (payload: any, done: any) => {
    try {
      const user = await userRepo.findOneBy({ id: payload?.id });

      if (user) {
        done(null, { tokenPayload: payload });
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  };

  const jwtStrategy = new JwtStrategy(opts, verify);

  jwtStrategy.name = String(name);

  return jwtStrategy;
}

export default passportJwtStrategyFactory;
