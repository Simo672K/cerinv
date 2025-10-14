import { Router } from "express";
import Auth from "../controllers/auth.controller";
import { controllerErrorRecoverer } from "../utils/errors";
import { Role } from "@prisma/client";
import Middleware from "../middlewares";

const authRoutes = Router();

authRoutes.post(
  "/auth/signin",
  controllerErrorRecoverer(Auth.signInController)
);
authRoutes.post(
  "/auth/signout",
  Middleware.authorizeRoles([Role.ADMIN, Role.STAFF, Role.USER]),
  Auth.signOutController
);

export default authRoutes;
