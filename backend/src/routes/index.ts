import { Router } from "express";
import authApi from "./auth.router";

const router = Router();

router.use(authApi);

export default router;
