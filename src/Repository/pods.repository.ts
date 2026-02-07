import type { Pod, Prisma, PodRole } from "@prisma/client";
import Prisma_Instances from "../config/Prisma_Instances.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

/* ------------------------------------------------ */
/* -------------------- TYPES --------------------- */
/* ------------------------------------------------ */

type PodPayload<T extends Prisma.PodSelect | undefined> =
  T extends Prisma.PodSelect
    ? Prisma.PodGetPayload<{ select: T }>
    : Pod;

type Pod_Schema = {
  Obj?: Pod | null;
  IsSucces: boolean;
  Error_Code?: string | null;
};

/* ------------------------------------------------ */
/* ------------------- REPOSITORY ----------------- */
/* ------------------------------------------------ */

class Pod_class {

  /* ------------------------------------------------ */
  /* ------------------- GET POD -------------------- */
  /* ------------------------------------------------ */

  async Get_Pod<T extends Prisma.PodSelect | undefined = undefined>(args: {
    where: Prisma.PodWhereUniqueInput;
    select?: T;
  }): Promise<{
    Obj: PodPayload<T> | null;
    IsSucces: boolean;
    Error_Code?: string;
  }> {
    try {
      const pod = await Prisma_Instances.pod.findUnique({
        where: args.where,
        ...(args.select && { select: args.select }),
      });

      return {
        Obj: pod as PodPayload<T> | null,
        IsSucces: true,
      };
    } catch (err) {
      console.error("Get_Pod error:", err);
      return {
        Obj: null,
        IsSucces: false,
        Error_Code: "500",
      };
    }
  }

  // check if pod exists by id
  async Is_Pod_Exists(podId: string): Promise<boolean> {

    try {
      const pod = await Prisma_Instances.pod.findUnique({
        where: { uuid: podId },
        select: { uuid: true },
      });

      return !!pod;
    } catch (err) {
      console.error("Is_Pod_Exists error:", err);
      return false;
    }
  }

  /* ------------------------------------------------ */
  /* ----------- GET POD WITH MEMBERS --------------- */
  /* ------------------------------------------------ */

  async Get_Pod_With_Members(where: Prisma.PodWhereUniqueInput) {
    return Prisma_Instances.pod.findUnique({
      where,
      include: {
        members: {
          include: { user: true },
        },
      },
    });
  }

  /* ------------------------------------------------ */
  /* ---------------- MEMBERSHIP -------------------- */
  /* ------------------------------------------------ */

  async Get_Membership(podId: string, userId: string) {
    return Prisma_Instances.podMember.findUnique({
      where: {
        podId_userId: { podId, userId },
      },
      select: { role: true },
    });
  }

  async Member_Count(podId: string): Promise<number> {
    return Prisma_Instances.podMember.count({
      where: { podId },
    });
  }

  /* ------------------------------------------------ */
  /* ---------------- PUBLIC PODS ------------------- */
  /* ------------------------------------------------ */

  async Get_Public_Pods(limit = 20, offset = 0) {
    return Prisma_Instances.pod.findMany({
      where: {
        visibility: "public",
        status: "active",
      },
      take: limit,
      skip: offset,
      orderBy: { activityScore: "desc" },
    });
  }

  /* ------------------------------------------------ */
  /* ---------------- CREATE POD -------------------- */
  /* ------------------------------------------------ */

  async Create_Pod(
    data: Prisma.PodCreateInput,
    ownerId: string,
  ): Promise<Pod_Schema> {

    try {

      const pod = await Prisma_Instances.$transaction(async (tx) => {

        const createdPod = await tx.pod.create({
          data: {
            ...data,
            createdBy: {
              connect: { id: ownerId },
            },
          },
        });

        await tx.podMember.create({
          data: {
            podId: createdPod.uuid,
            userId: ownerId,
            role: "owner",
          },
        });

        return createdPod;
      });

      return {
        Obj: pod,
        IsSucces: true,
      };

    } catch (err) {

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return { IsSucces: false, Error_Code: err.code };
      }

      return { IsSucces: false, Error_Code: "500" };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- ADD MEMBER -------------------- */
  /* ------------------------------------------------ */

  async Add_Member(
    podId: string,
    userId: string,
    role: PodRole = "member",
  ): Promise<{ IsSucces: boolean; Error_Code?: string }> {

    try {

      await Prisma_Instances.podMember.create({
        data: { podId, userId, role },
      });

      return { IsSucces: true };

    } catch (err) {

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return { IsSucces: false, Error_Code: err.code };
      }

      return { IsSucces: false, Error_Code: "500" };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- REMOVE MEMBER ----------------- */
  /* ------------------------------------------------ */

  async Remove_Member(
    podId: string,
    userId: string,
  ): Promise<{ IsSucces: boolean }> {

    try {

      await Prisma_Instances.podMember.delete({
        where: { podId_userId: { podId, userId } },
      });

      return { IsSucces: true };

    } catch (err) {

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        return { IsSucces: false };
      }

      console.error("Remove_Member error:", err);
      return { IsSucces: false };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- CREATE MESSAGE ---------------- */
  /* ------------------------------------------------ */

  async Create_Message(
    podId: string,
    channelId: string | null,
    senderId: string,
    content: string,
  ): Promise<{ IsSucces: boolean; Obj?: any; Error_Code?: string }> {

    try {

      const msg = await Prisma_Instances.message.create({
        data: {
          podId,
          channelId,
          senderId,
          content,
        },
      });

      return { IsSucces: true, Obj: msg };

    } catch (err) {
      console.error("Create_Message error:", err);
      return { IsSucces: false, Error_Code: "500" };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- CAN JOIN ---------------------- */
  /* ------------------------------------------------ */

  async Can_Join(
    podId: string,
  ): Promise<{ CanJoin: boolean; Error_Code: string }> {

    try {

      const pod = await Prisma_Instances.pod.findUnique({
        where: { uuid: podId },
        select: {
          maxMembers: true,
          _count: { select: { members: true } },
        },
      });

      if (!pod) {
        return { CanJoin: false, Error_Code: "404" };
      }

      return {
        CanJoin: pod._count.members < pod.maxMembers,
        Error_Code: "200",
      };

    } catch (err) {
      console.error("Can_Join error:", err);
      return { CanJoin: false, Error_Code: "500" };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- UPDATE POD -------------------- */
  /* ------------------------------------------------ */

  async Update_Pod(
    where: Prisma.PodWhereUniqueInput,
    data: Prisma.PodUpdateInput,
  ): Promise<{ IsSucces: boolean; Error_Code?: string }> {

    try {

      await Prisma_Instances.pod.update({ where, data });

      return { IsSucces: true };

    } catch (err) {

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        return { IsSucces: false, Error_Code: "404" };
      }

      console.error("Update_Pod error:", err);
      return { IsSucces: false, Error_Code: "500" };
    }
  }

  /* ------------------------------------------------ */
  /* ----------- UPDATE MEMBER ROLE ----------------- */
  /* ------------------------------------------------ */

  async Update_Member_Role(
    podId: string,
    userId: string,
    role: PodRole,
  ): Promise<{ IsSucces: boolean }> {

    try {

      await Prisma_Instances.podMember.update({
        where: { podId_userId: { podId, userId } },
        data: { role },
      });

      return { IsSucces: true };

    } catch (err) {

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        return { IsSucces: false };
      }

      console.error("Update_Member_Role error:", err);
      return { IsSucces: false };
    }
  }

  /* ------------------------------------------------ */
  /* ---------------- SOFT DELETE ------------------- */
  /* ------------------------------------------------ */

  async Delete_Pod(
    where: Prisma.PodWhereUniqueInput,
  ): Promise<{ IsSucces: boolean }> {

    try {

      await Prisma_Instances.pod.update({
        where,
        data: { status: "archived" },
      });

      return { IsSucces: true };

    } catch (err) {
      console.error("Delete_Pod error:", err);
      return { IsSucces: false };
    }
  }

  /* ------------------------------------------------ */
  /* ------------ COUNT PODS BY USER ---------------- */
  /* ------------------------------------------------ */

  async Count_Pods_By_User(userId: string): Promise<number> {
    return Prisma_Instances.pod.count({
      where: { createdById: userId },
    });
  }

  // Invite management
  async GetInviteByToken(token: string) {
  return Prisma_Instances.podInvite.findUnique({
    where: { token }
  })
}

}






/* ------------------------------------------------ */

export const PodRepo = new Pod_class();
