// what I need in the future is for all possible login stratigies there should be an interface that should be
// implemented as wrapper around the strategy in order to be used in the auth service as the desired login strategy
import prisma from "../config/db";
import PasswordHandler from "../utils/password";
import { TokenHandler } from "../utils/token";
import dotenv from "dotenv";

dotenv.config();

interface SignedInRes {
  message: string;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  constructor(
    private asccessTokenHandler: TokenHandler,
    private refreshTokenHandler: TokenHandler
  ) {}

  // signin for now is only the credentials strategy for simplecity
  async signIn(email: string, password: string): Promise<SignedInRes | null> {
    const expectedUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        email: true,
        profile: { select: { access: { select: { role: true } } } },
      },
    });

    if (!expectedUser) return null;

    const isValidPassword = await PasswordHandler.comparePasswords(
      password,
      expectedUser.password
    );

    if (!isValidPassword) return null;

    const accessToken = this.asccessTokenHandler.signToken({
      role: expectedUser.profile!.access.role,
      email: expectedUser.email,
      id: expectedUser.id,
    });

    const refreshToken = this.refreshTokenHandler.signToken({
      id: expectedUser.id,
      sessionId: "",
    });

    return {
      message: "User signed in successfully!",
      accessToken,
      refreshToken,
    };
  }

  async issueRefreshToken() {}
}

export { AuthService };
