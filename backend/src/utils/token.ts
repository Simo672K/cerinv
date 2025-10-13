import { JwtPayload, sign, verify } from "jsonwebtoken";

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
      expiresIn: this.type === "ACCESS" ? "15m" : "5h",
    });

    return signedToken;
  }

  validateToken(token: string): JwtPayload | null {
    let decodedPayload: JwtPayload | null = null;
    verify(
      token,
      this.tokensecret,
      {
        maxAge: this.type === "ACCESS" ? "15m" : "5h",
      },
      (err, decoded) => {
        if (err) {
          throw new Error();
        } else {
          decodedPayload = decoded as JwtPayload;
        }
      }
    );

    return decodedPayload;
  }
}

export { TokenHandler };
