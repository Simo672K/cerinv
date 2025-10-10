import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { TokenHandler } from "../utils/token";
import dotenv from "dotenv";

dotenv.config();

class Auth {
  static async signInController(req: Request, res: Response) {
    //TODO : signin controller
    try {
      const { email, password } = req.body;
      const tokenHandler = new TokenHandler(process.env.ACCESS_KEY!);
      const authService = new AuthService(tokenHandler);

      const willSignIn = await authService.signIn(email, password);
      console.log(willSignIn);

      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
}

export default Auth;
