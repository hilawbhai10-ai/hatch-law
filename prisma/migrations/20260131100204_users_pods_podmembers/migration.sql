-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PodVisibility" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "PodStatus" AS ENUM ('active', 'archived', 'expired');

-- CreateEnum
CREATE TYPE "PodJoinPolicy" AS ENUM ('open', 'approval', 'invite_only');

-- CreateEnum
CREATE TYPE "AccountabilityCadence" AS ENUM ('daily', 'weekly', 'custom');

-- CreateEnum
CREATE TYPE "PodRole" AS ENUM ('owner', 'admin', 'mod', 'member', 'viewer');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "avatarUrl" TEXT,
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "maximumPods" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pod" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "visibility" "PodVisibility" NOT NULL,
    "status" "PodStatus" NOT NULL DEFAULT 'active',
    "joinPolicy" "PodJoinPolicy" NOT NULL DEFAULT 'open',
    "maxMembers" INTEGER NOT NULL,
    "accountabilityStartDate" TIMESTAMP(3) NOT NULL,
    "accountabilityEndDate" TIMESTAMP(3) NOT NULL,
    "accountabilityCadence" "AccountabilityCadence" NOT NULL,
    "podPfp" TEXT,
    "coverImage" TEXT,
    "activityScore" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pod_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PodMember" (
    "id" TEXT NOT NULL,
    "podId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "PodRole" NOT NULL DEFAULT 'member',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PodMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Pod_visibility_idx" ON "Pod"("visibility");

-- CreateIndex
CREATE INDEX "Pod_status_idx" ON "Pod"("status");

-- CreateIndex
CREATE INDEX "Pod_category_idx" ON "Pod"("category");

-- CreateIndex
CREATE INDEX "Pod_createdById_idx" ON "Pod"("createdById");

-- CreateIndex
CREATE INDEX "PodMember_userId_idx" ON "PodMember"("userId");

-- CreateIndex
CREATE INDEX "PodMember_podId_idx" ON "PodMember"("podId");

-- CreateIndex
CREATE UNIQUE INDEX "PodMember_podId_userId_key" ON "PodMember"("podId", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pod" ADD CONSTRAINT "Pod_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodMember" ADD CONSTRAINT "PodMember_podId_fkey" FOREIGN KEY ("podId") REFERENCES "Pod"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodMember" ADD CONSTRAINT "PodMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
