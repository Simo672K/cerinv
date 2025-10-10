import { Request, Response } from "express";
import UserService from "../services/user.service";
import PasswordHandler from "../utils/password";

class User {
  static userService = new UserService();

  static async registerController(req: Request, res: Response) {
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await PasswordHandler.hashPassword(password);

    if (!hashedPassword)
      return res.status(500).json({
        message:
          "INTERNAL_SERVER_ERROR! An error occured while registring the user.",
      });
    await User.userService.createUser({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created successfully!" });
  }

  static async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id!;
      if (!+userId)
        return res.status(404).json({
          message: "User Not Found.",
        });

      const foundUser = await User.userService.getUser(+userId);
      if (!foundUser)
        return res.status(404).json({
          message: "User Not Found.",
        });

      res.status(200).json({
        userId,
        firstName: foundUser.firstName,
        lasttName: foundUser.lastName,
        email: foundUser.email,
        profile: foundUser.profile,
        createdAt: foundUser.createdAt,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  static async listUsersController(req: Request, res: Response) {
    const users = await User.userService.getAllUsers();

    res.json({
      count: users.length,
      data: users,
    });
  }
}

export default User;
