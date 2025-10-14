// what I need in the future is for all possible login stratigies there should be an interface that should be
// implemented as wrapper around the strategy in order to be used in the auth service as the desired login strategy
import { hash } from "bcrypt";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/db";
import { HASH_ROUNDS } from "../utils/constants";
import PasswordHandler from "../utils/password";
import { TokenHandler } from "../utils/token";

dotenv.config();

interface SignedInRes {
  message: string;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  constructor(
    private accessTokenHandler: TokenHandler,
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

    const accessToken = this.accessTokenHandler.signToken({
      role: expectedUser.profile!.access.role,
      email: expectedUser.email,
      id: expectedUser.id,
    });

    const newSessionId = uuidv4();

    const refreshToken = this.refreshTokenHandler.signToken({
      userId: expectedUser.id,
      sessionId: newSessionId,
    });

    const refreshTokenHash = await hash(refreshToken, HASH_ROUNDS);

    try {
      await prisma.session.create({
        data: {
          id: newSessionId,
          userId: expectedUser.id,
          refreshTokenHash,
        },
      });

      // * maybe in the future: store this session somewhere
    } catch (e) {
      throw new Error(
        `${
          (e as Error).name
        }. Failed to create a record the new session on the database!`
      );
    }

    return {
      message: "User signed in successfully!",
      accessToken,
      refreshToken,
    };
  }

  async signout(context: Express.Context) {
    // delelte the session with the specified id by disabling the token validity, requested from the context in the express request context
    try {
      await prisma.session.update({
        data: {
          isValid: false,
          updatedAt: new Date(),
        },
        where: {
          id: context.sessionId,
        },
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async refreshCredentials(refreshToken: string): Promise<string | Error> {
    const refreshTokenHash = await hash(refreshToken, HASH_ROUNDS);
    const userSession = await prisma.session.findUnique({
      where: { refreshTokenHash },
      include: {
        user: {
          include: {
            profile: { select: { access: { select: { role: true } } } },
          },
        },
      },
    });

    if (!userSession || !userSession.isValid) {
      return new Error("invalid token, there is no session for this token");
    }

    return this.accessTokenHandler.signToken({
      id: userSession.user.id,
      email: userSession.user.email,
      role: userSession.user.profile!.access.role,
    });
  }
}

export { AuthService };
