-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invitee" ALTER COLUMN "createdAt" DROP NOT NULL;
