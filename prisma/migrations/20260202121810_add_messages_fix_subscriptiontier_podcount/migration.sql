-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('Free', 'Premium', 'Elite');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdPodsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'Free';

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "podId" TEXT NOT NULL,
    "channelId" TEXT,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_podId_idx" ON "Message"("podId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_podId_channelId_createdAt_idx" ON "Message"("podId", "channelId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_podId_fkey" FOREIGN KEY ("podId") REFERENCES "Pod"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
