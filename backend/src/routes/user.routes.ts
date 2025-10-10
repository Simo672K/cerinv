import { Router } from "express";
import User from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/user/register", User.registerController);
userRoutes.get("/user/all", User.listUsersController);
userRoutes.get("/user/:id", User.getUser);
// userRoutes.put("/user/:id");
// userRoutes.delete("/user/:id");

export default userRoutes;
