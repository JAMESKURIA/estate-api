import passport from "passport";

export default (stragegy: string | string[]) =>
  passport.authenticate(stragegy, {
    session: false,
    assignProperty: "jwtData",
  });
