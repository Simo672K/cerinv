import { Router } from "express";
import { controllerErrorRecoverer } from "../utils/errors";
import User from "../controllers/user.controller";
import Middleware from "../middlewares";
import { Role } from "@prisma/client";

const userRoutes = Router();

userRoutes.post(
  "/user/register",
  controllerErrorRecoverer(User.registerController)
);
userRoutes.get(
  "/user/all",
  Middleware.allowUsersOfRoleType([Role.USER, Role.ADMIN]),
  controllerErrorRecoverer(User.listUsersController)
);
userRoutes.get("/user/:id", controllerErrorRecoverer(User.getUser));
// userRoutes.put("/user/:id");
// userRoutes.delete("/user/:id");

export default userRoutes;
