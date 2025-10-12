import { Router } from "express";
import { controllerErrorRecoverer } from "../utils/errors";
import User from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post(
  "/user/register",
  controllerErrorRecoverer(User.registerController)
);
userRoutes.get("/user/all", controllerErrorRecoverer(User.listUsersController));
userRoutes.get("/user/:id", controllerErrorRecoverer(User.getUser));
// userRoutes.put("/user/:id");
// userRoutes.delete("/user/:id");

export default userRoutes;
