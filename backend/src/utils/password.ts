import { compare, hash } from "bcrypt";
import { HASH_ROUNDS } from "./constants";

class PasswordHandler {
  static async hashPassword(rawPassword: string) {
    try {
      const hashedPassword = await hash(rawPassword, HASH_ROUNDS);

      return hashedPassword;
    } catch (e) {
      return null;
    }
  }

  static comparePasswords = async (password: string, hashedPassword: string) =>
    await compare(password, hashedPassword);
}

export default PasswordHandler;
