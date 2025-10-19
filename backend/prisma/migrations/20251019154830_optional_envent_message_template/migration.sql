-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_inviteTemplateId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "inviteTemplateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_inviteTemplateId_fkey" FOREIGN KEY ("inviteTemplateId") REFERENCES "InviteTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
