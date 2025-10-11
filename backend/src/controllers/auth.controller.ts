import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { TokenHandler } from "../utils/token";
import dotenv from "dotenv";
import { responseError } from "../utils/errors";

dotenv.config();

const tokenHandler = new TokenHandler(process.env.ACCESS_KEY!);
const authService = new AuthService(tokenHandler);

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

      res.json(willSignIn);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
}

export default Auth;
