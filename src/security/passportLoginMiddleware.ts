import { NextFunction, Request, Response } from "express";
import passport from "passport";

export default function passportLoginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authFunction = passport.authenticate("local", { session: false });

  authFunction(req, res, (err: any) => {
    if (err) {
      res.sendStatus(401).json(err);
      return next(err);
    }

    return next(null);
  });
}
