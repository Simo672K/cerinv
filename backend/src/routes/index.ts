import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import eventRoutes from "./event.routes";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(eventRoutes);

export default router;
