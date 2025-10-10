import { PrismaClient } from "@prisma/client";

class DbClient {
  private static client: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DbClient.client) {
      DbClient.client = new PrismaClient();
    }
    return DbClient.client;
  }
}

const prisma = DbClient.getInstance();

export default prisma;
