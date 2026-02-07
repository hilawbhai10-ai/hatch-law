-- CreateEnum
CREATE TYPE "JoinRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "PodInvite" (
    "id" TEXT NOT NULL,
    "podId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "maxUses" INTEGER,
    "usesCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PodInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodJoinRequest" (
    "id" TEXT NOT NULL,
    "podId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "JoinRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodJoinRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PodInvite_token_key" ON "PodInvite"("token");

-- CreateIndex
CREATE INDEX "PodInvite_podId_idx" ON "PodInvite"("podId");

-- CreateIndex
CREATE INDEX "PodInvite_token_idx" ON "PodInvite"("token");

-- CreateIndex
CREATE INDEX "PodJoinRequest_podId_idx" ON "PodJoinRequest"("podId");

-- CreateIndex
CREATE UNIQUE INDEX "PodJoinRequest_podId_userId_key" ON "PodJoinRequest"("podId", "userId");

-- AddForeignKey
ALTER TABLE "PodInvite" ADD CONSTRAINT "PodInvite_podId_fkey" FOREIGN KEY ("podId") REFERENCES "Pod"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodInvite" ADD CONSTRAINT "PodInvite_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodJoinRequest" ADD CONSTRAINT "PodJoinRequest_podId_fkey" FOREIGN KEY ("podId") REFERENCES "Pod"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodJoinRequest" ADD CONSTRAINT "PodJoinRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
