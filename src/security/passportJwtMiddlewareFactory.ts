import { authenticate } from "passport";

export default (stragegy: string | string[]) =>
  authenticate(stragegy, { session: false, assignProperty: "jwtData" });
