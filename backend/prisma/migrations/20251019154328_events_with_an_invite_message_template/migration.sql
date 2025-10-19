/*
  Warnings:

  - Added the required column `inviteTemplateId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHour` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Mesurement" AS ENUM ('DAY', 'HOUR', 'MINUTE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "inviteTemplateId" INTEGER NOT NULL,
ADD COLUMN     "mesurement" "Mesurement" NOT NULL DEFAULT 'HOUR',
ADD COLUMN     "startHour" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InviteTemplate" (
    "id" SERIAL NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "InviteTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_inviteTemplateId_fkey" FOREIGN KEY ("inviteTemplateId") REFERENCES "InviteTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
