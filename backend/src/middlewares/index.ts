import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { responseError } from "../utils/errors";
import {
  accessTokenHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller";
import dotenv from "dotenv";

dotenv.config();

class Middleware {
  static allowUsersOfRoleType = (allowedRoles: Role[]) =>
    function (req: Request, res: Response, next: NextFunction) {
      try {
        if (!req.cookies) throw new Error("invalid credentials");
        const { access_token, refresh_token } = req.cookies;

        const { id, email, role } =
          accessTokenHandler.validateToken(access_token);
        const { sessionId } = refreshTokenHandler.validateToken(refresh_token);

        if (!allowedRoles.includes(role)) throw new Error();
        req.context = {
          sessionId: sessionId,
          user: {
            id,
            email,
            role,
          },
        };

        console.log("access guarentied");

        next();
      } catch (e) {
        res
          .status(401)
          .json(
            responseError(
              401,
              "Unothorized access, try loggin in again.",
              "UNOTHORIZED_ACCESS"
            )
          );
      }
    };
}

export default Middleware;
