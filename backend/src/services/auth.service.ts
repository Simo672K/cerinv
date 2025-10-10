// what I need in the future is for all possible login stratigies there should be an interface that should be
// implemented as wrapper around the strategy in order to be used in the auth service as the desired login strategy
import { TokenHandler } from "../utils/token";
import dotenv from "dotenv";

dotenv.config();

const users = [
  {
    id: 123456789,
    email: "jhon@email.com",
    password: "passwd123456",
  },
];

interface SignedInRes {
  isSigned: boolean;
  isError: boolean;
  msg: string;
  token: string;
}

class AuthService {
  constructor(private tokenHandler: TokenHandler) {}

  // signin for now is only the credentials strategy for simplecity
  async signIn(email: string, password: string): Promise<SignedInRes> {
    let signedIn = false;
    let token = "";
    // users.forEach((user) => {
    //   if (user.email == email && user.password == password) {
    //     signedIn = true;
    //   }
    // });

    const foundUser = users.find(
      (user) => user.email == email && user.password == password
    );
    signedIn = !!foundUser;

    if (!!foundUser) {
      token = this.tokenHandler.signToken({
        email: foundUser.email,
        id: foundUser.id,
      });
    }

    return new Promise((resolve) => {
      resolve({
        isSigned: signedIn,
        isError: !signedIn,
        msg: !signedIn
          ? "Error, invalid credentials."
          : "Signed in successfully!",
        token,
      });
    });
  }
}

export { AuthService };
