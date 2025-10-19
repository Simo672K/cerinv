import { Request, Response } from "express";
import EventService from "../services/event.service";
import { responseError } from "../utils/errors";
import { Mesurement } from "@prisma/client";

class Event {
  static async createEventController(req: Request, res: Response) {
    const { name, startDate, duration, startHour, mesurement } = req.body;

    if (!name || !startDate || !duration) {
      return res
        .status(400)
        .json(
          responseError(
            400,
            "Please provide all required fields.",
            "BAD_REQUEST"
          )
        );
    }

    const willCreateEvent = await EventService.createEvent({
      name: name as string,
      duration: duration as number,
      startDate: startDate as Date,
      startHour: startHour as string,
      mesurement: mesurement as Mesurement,
      userId: req.context!.user.id,
    });

    if (willCreateEvent instanceof Error) {
      return res
        .status(500)
        .json(
          responseError(
            500,
            "An error occured on the server, try again later.",
            "INTERNAL_SERVER_ERROR"
          )
        );
    }

    res.status(201).json({
      message: "Event created successfully!",
    });
  }
}

export default Event;
