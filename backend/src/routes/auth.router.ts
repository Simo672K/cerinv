import { Router } from "express";
import Auth from "../controllers/auth.controller";

const authApi = Router();
authApi.post("/api/auth/signin", Auth.signInController);
authApi.post("/api/auth/signup", Auth.signUpController);

export default authApi;
