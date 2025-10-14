import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { TokenHandler } from "../utils/token";
import dotenv from "dotenv";
import { responseError } from "../utils/errors";

dotenv.config();

export const accessTokenHandler = new TokenHandler(
  process.env.ACCESS_KEY!,
  "ACCESS"
);
export const refreshTokenHandler = new TokenHandler(
  process.env.REFRESH_KEY!,
  "REFRESH"
);
const authService = new AuthService(accessTokenHandler, refreshTokenHandler);

class Auth {
  static async signInController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const willSignIn = await authService.signIn(email, password);
      if (!willSignIn)
        return res
          .status(401)
          .json(
            responseError(401, "Invalid credentials", "UNAUTHORIZED_ACCESS")
          );
      // refreshTokenHandler.signToken()
      res.cookie("access_token", willSignIn.accessToken, {
        sameSite: "strict",
        httpOnly: true,
      });
      res.cookie("refresh_token", willSignIn.refreshToken, {
        sameSite: "strict",
        httpOnly: true,
      });

      res.status(200).json({ message: willSignIn.message });
    } catch (e) {
      console.log(e);

      res
        .status(500)
        .json(
          responseError(
            500,
            "An error occured on the server, try again later.",
            "INTERNAL_SERVER_ERROR"
          )
        );
    }
  }

  static async signOutController(req: Request, res: Response) {
    console.log(req.context);
    if (req.context) {
      const isSignedOut = await authService.signout(req.context!);

      if (!isSignedOut) {
        return res
          .status(500)
          .json(
            responseError(
              500,
              "An error occured on the server",
              "INTERNAL_SERVER_ERROR"
            )
          );
      }

      // cleaning token cookies
      res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
      res.clearCookie("refresh_token", { httpOnly: true, sameSite: "strict" });
    }

    res.status(301).json({
      message: "Signed out successfully!",
    });
  }
}

export default Auth;
