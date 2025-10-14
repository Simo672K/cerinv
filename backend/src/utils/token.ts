import { JwtPayload, sign, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "./constants";

export interface AccessTokenPayload {
  role: string;
  email: string;
  id: number;
}

export interface RefreshTokenPayload {
  userId: number;
  sessionId: string;
}

class TokenHandler {
  constructor(
    private tokensecret: string,
    private type: "ACCESS" | "REFRESH"
  ) {}

  signToken(payload: AccessTokenPayload | RefreshTokenPayload): string {
    const signedToken = sign(payload, this.tokensecret, {
      expiresIn:
        this.type === "ACCESS" ? ACCESS_TOKEN_MAX_AGE : REFRESH_TOKEN_MAX_AGE,
    });

    return signedToken;
  }

  validateToken(token: string): JwtPayload | null {
    let decodedPayload: JwtPayload | null = null;
    verify(
      token,
      this.tokensecret,
      {
        maxAge:
          this.type === "ACCESS" ? ACCESS_TOKEN_MAX_AGE : REFRESH_TOKEN_MAX_AGE,
      },
      (err, decoded) => {
        if (err) {
          decodedPayload = null;
        } else {
          decodedPayload = decoded as JwtPayload;
        }
      }
    );

    return decodedPayload;
  }
}

export { TokenHandler };
