import { Router } from "express";
import Auth from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/auth/signin", Auth.signInController);

export default authRoutes;
