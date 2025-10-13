import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { responseError } from "../utils/errors";
import {
  accessTokenHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller";
import dotenv from "dotenv";
import { AccessTokenPayload, RefreshTokenPayload } from "../utils/token";
import prisma from "../config/db";

dotenv.config();

class Middleware {
  static allowUsersOfRoleType = (allowedRoles: Role[]) =>
    async function (req: Request, res: Response, next: NextFunction) {
      try {
        if (!req.cookies) throw new Error("invalid credentials");
        const { access_token, refresh_token } = req.cookies;

        const accessPayload = accessTokenHandler.validateToken(access_token);
        const refreshPayload = refreshTokenHandler.validateToken(refresh_token);
        if (!(refreshPayload || accessPayload)) {
          throw new Error("User invalid credentials");
        }
        const { userId, sessionId } = refreshPayload as RefreshTokenPayload;

        if (accessPayload) {
          const { id, email, role } = accessPayload as AccessTokenPayload;

          if (!allowedRoles.includes(role as Role))
            throw new Error(
              "Restricted route, user cannot access this route. ACCESS_DENIED!"
            );
          req.context = {
            sessionId: sessionId,
            user: {
              id,
              email,
              role: role as Role,
            },
          };

          next();
          return;
        }

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            email: true,
            profile: {
              select: {
                access: {
                  select: {
                    role: true,
                  },
                },
              },
            },
          },
        });

        if (user) {
          const { email, profile } = user;
          const newAccessToken = accessTokenHandler.signToken({
            id: userId,
            email,
            role: profile!.access.role,
          });
          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
          });
          if (!allowedRoles.includes(profile!.access.role))
            throw new Error(
              "Restricted route, user cannot access this route. ACCESS_DENIED!"
            );
          next();
        }
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
