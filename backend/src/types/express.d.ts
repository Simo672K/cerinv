import type { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      role: Role;
    }

    interface Request {
      context?: {
        user?: UserPayload;
        sessionId?: string;
      };
    }
  }
}

export {};
