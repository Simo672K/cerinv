import { Request, Response } from "express";
import UserService from "../services/user.service";
import PasswordHandler from "../utils/password";
import { responseError } from "../utils/errors";

class User {
  static userService = new UserService();

  static async registerController(req: Request, res: Response) {
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await PasswordHandler.hashPassword(password);

    if (!hashedPassword)
      return res
        .status(500)
        .json(
          responseError(
            500,
            "An error occured on the server, try again later.",
            "INTERNAL_SERVER_ERROR"
          )
        );

    try {
      await User.userService.createUser({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
    } catch (e) {
      return res
        .status(400)
        .json(
          responseError(
            400,
            "An existen user already with this email, please use another one.",
            "BAD_REQUEST"
          )
        );
    }

    res.status(200).json({ message: "User created successfully!" });
  }

  static async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id!;
      if (!+userId)
        return res
          .status(404)
          .json(
            responseError(
              404,
              "We can't find what you are looking for.",
              "NOT_FOUND"
            )
          );

      const foundUser = await User.userService.getUser(+userId);
      if (!foundUser)
        return res
          .status(404)
          .json(
            responseError(
              404,
              "We can't find what you are looking for.",
              "NOT_FOUND"
            )
          );

      res.status(200).json({
        userId,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        profile: foundUser.profile,
        createdAt: foundUser.createdAt,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(
          responseError(
            500,
            "An error occured on the server, try again later.",
            "INTERNAL_SERVER_ERROR"
          )
        );
    }
  }

  static async listUsersController(req: Request, res: Response) {
    const users = await User.userService.getAllUsers();
    console.log(req.user);
    res.json({
      count: users.length,
      data: users,
    });
  }
}

export default User;
