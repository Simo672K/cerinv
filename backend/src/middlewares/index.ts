import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { responseError } from "../utils/errors";
import {
  accessTokenHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller";
import prisma from "../config/db";

class Middleware {
  static authorizeRoles = (allowedRoles: Role[]) =>
    async function (req: Request, res: Response, next: NextFunction) {
      try {
        const { access_token, refresh_token } = req.cookies || {};

        if (!access_token && !refresh_token)
          throw new Error("Missing authentication tokens");

        const accessPayload = accessTokenHandler.validateToken(access_token);
        const refreshPayload = refreshTokenHandler.validateToken(refresh_token);

        if (!refreshPayload) throw new Error("Invalid refresh token");

        const { userId, sessionId } = refreshPayload;

        if (accessPayload) {
          const { id, email, role } = accessPayload;

          if (!allowedRoles.includes(role as Role))
            throw new Error("ACCESS_DENIED");

          req.context = {
            sessionId,
            user: { id, email, role },
          };

          return next();
        }

        const session = await prisma.session.findUnique({
          where: { id: sessionId },
        });
        if (!session || !session.isValid) throw new Error("Invalid session");

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            email: true,
            profile: { select: { access: { select: { role: true } } } },
          },
        });

        if (!user) throw new Error("User not found");

        const { email, profile } = user;
        const role = profile!.access.role;

        if (!allowedRoles.includes(role)) throw new Error("ACCESS_DENIED");

        // Issue new access token
        const newAccessToken = accessTokenHandler.signToken({
          id: userId,
          email,
          role,
        });
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        req.context = { sessionId, user: { id: userId, email, role } };

        next();
      } catch (e) {
        console.error("Auth middleware error:", e);
        res
          .status(401)
          .json(
            responseError(
              401,
              "Unauthorized access. Please log in again.",
              "UNAUTHORIZED_ACCESS"
            )
          );
      }
    };
}

export default Middleware;
