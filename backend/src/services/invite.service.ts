import { Invitee } from "@prisma/client";
import prisma from "../config/db";

// todo: invite crud
class InviteService {
  static async addInvitee(invitee: Invitee) {
    try {
      const addedInvitee = await prisma.invitee.create({
        data: invitee,
      });
    } catch (e) {
      // todo: error handling in case of invitee add action fail.
    }
  }

  static async setEventInvitee(eventId: number) {
    try {
    } catch (e) {
      return new Error((e as Error).message);
    }
  }

  setInviteTemplate() {}
}

export default InviteService;
