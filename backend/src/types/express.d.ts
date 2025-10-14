import type { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      role: Role;
    }

    interface Context {
      user: UserPayload;
      sessionId: string;
    }

    interface Request {
      context?: Context;
    }
  }
}

export {};
