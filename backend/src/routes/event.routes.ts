import { Router } from "express";
import Event from "../controllers/event.controller";
import { controllerErrorRecoverer } from "../utils/errors";
import { Role } from "@prisma/client";
import Middleware from "../middlewares";

const eventRoutes = Router();

eventRoutes.post(
  "/event/create",
  Middleware.authorizeRoles([Role.USER]),
  controllerErrorRecoverer(Event.createEventController)
);

export default eventRoutes;
