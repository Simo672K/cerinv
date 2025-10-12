import { Router } from "express";
import Auth from "../controllers/auth.controller";
import { controllerErrorRecoverer } from "../utils/errors";

const authRoutes = Router();
authRoutes.post(
  "/auth/signin",
  controllerErrorRecoverer(Auth.signInController)
);

export default authRoutes;
