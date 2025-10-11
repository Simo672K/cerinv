import { sign, verify } from "jsonwebtoken";

interface TokenPayload {
  role: string;
  email: string;
  id: number;
}

class TokenHandler {
  constructor(private tokensecret: string) {}

  signToken(payload: TokenPayload): string {
    const signedToken = sign(payload, this.tokensecret, {
      expiresIn: "15m",
    });

    return signedToken;
  }

  validateToken(token: string) {
    const jwt = verify(
      token,
      this.tokensecret,
      {
        maxAge: "15m",
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
