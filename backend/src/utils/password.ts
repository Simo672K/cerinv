import { compare, hash } from "bcrypt";

class PasswordHandler {
  static async hashPassword(rawPassword: string) {
    try {
      const hashedPassword = await hash(rawPassword, 10);

      return hashedPassword;
    } catch (e) {
      return null;
    }
  }

  static comparePasswords = async (password: string, hashedPassword: string) =>
    await compare(password, hashedPassword);
}

export default PasswordHandler;
