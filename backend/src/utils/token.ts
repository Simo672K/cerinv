import { sign, verify } from "jsonwebtoken";

interface AccessTokenPayload {
  role: string;
  email: string;
  id: number;
}

interface RefreshTokenPayload {
  id: number;
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

  validateToken(token: string) {
    const jwt = verify(
      token,
      this.tokensecret,
      {
        maxAge: this.type === "ACCESS" ? "15m" : "5h",
      },
      (err, decoded) => {
        if (err) {
          console.log(err.message);
          return;
        } else console.log(decoded);
      }
    );
  }
}

export { TokenHandler };
