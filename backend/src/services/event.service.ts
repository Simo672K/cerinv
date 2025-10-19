import { Event, Mesurement } from "@prisma/client";
import prisma from "../config/db";

interface EventData {
  name: string;
  duration: number;
  startDate: Date;
  startHour: string;
  mesurement: Mesurement;
  userId: number;
}

class EventService {
  static async createEvent(event: EventData): Promise<Event | Error> {
    try {
      const newEvent = await prisma.event.create({
        data: event,
      });

      return newEvent;
    } catch (e) {
      return new Error((e as Error).message);
    }
  }

  static async getUserEvent(ctx: Express.Context) {
    try {
      const userEvents = prisma.event.findMany({
        where: {
          userId: ctx.user.id,
        },
      });
      return userEvents;
    } catch (e) {
      return new Error();
    }
  }
  async getEvent(eventId: number) {
    await prisma.event.findUnique;
  }
  async updateEvent() {}
  async deleteEvent() {}
}

export default EventService;
