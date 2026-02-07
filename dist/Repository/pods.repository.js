import Prisma_Instances from "../config/Prisma_Instances.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
/* ------------------------------------------------ */
/* ------------------- REPOSITORY ----------------- */
/* ------------------------------------------------ */
class Pod_class {
    /* ------------------------------------------------ */
    /* ------------------- GET POD -------------------- */
    /* ------------------------------------------------ */
    async Get_Pod(args) {
        try {
            const pod = await Prisma_Instances.pod.findUnique({
                where: args.where,
                ...(args.select && { select: args.select }),
            });
            return {
                Obj: pod,
                IsSucces: true,
            };
        }
        catch (err) {
            console.error("Get_Pod error:", err);
            return {
                Obj: null,
                IsSucces: false,
                Error_Code: "500",
            };
        }
    }
    /* ------------------------------------------------ */
    /* ----------- GET POD WITH MEMBERS --------------- */
    /* ------------------------------------------------ */
    async Get_Pod_With_Members(where) {
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
    async Get_Membership(podId, userId) {
        return Prisma_Instances.podMember.findUnique({
            where: {
                podId_userId: { podId, userId },
            },
            select: { role: true },
        });
    }
    async Member_Count(podId) {
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
    async Create_Pod(data, ownerId) {
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
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002") {
                return { IsSucces: false, Error_Code: err.code };
            }
            console.error("Create_Pod error:", err);
            return { IsSucces: false, Error_Code: "500" };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- ADD MEMBER -------------------- */
    /* ------------------------------------------------ */
    async Add_Member(podId, userId, role = "member") {
        try {
            await Prisma_Instances.podMember.create({
                data: { podId, userId, role },
            });
            return { IsSucces: true };
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002") {
                return { IsSucces: false, Error_Code: err.code };
            }
            console.error("Add_Member error:", err);
            return { IsSucces: false, Error_Code: "500" };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- REMOVE MEMBER ----------------- */
    /* ------------------------------------------------ */
    async Remove_Member(podId, userId) {
        try {
            await Prisma_Instances.podMember.delete({
                where: { podId_userId: { podId, userId } },
            });
            return { IsSucces: true };
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2025") {
                return { IsSucces: false };
            }
            console.error("Remove_Member error:", err);
            return { IsSucces: false };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- CREATE MESSAGE ---------------- */
    /* ------------------------------------------------ */
    async Create_Message(podId, channelId, senderId, content) {
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
        }
        catch (err) {
            console.error("Create_Message error:", err);
            return { IsSucces: false, Error_Code: "500" };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- CAN JOIN ---------------------- */
    /* ------------------------------------------------ */
    async Can_Join(podId) {
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
        }
        catch (err) {
            console.error("Can_Join error:", err);
            return { CanJoin: false, Error_Code: "500" };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- UPDATE POD -------------------- */
    /* ------------------------------------------------ */
    async Update_Pod(where, data) {
        try {
            await Prisma_Instances.pod.update({ where, data });
            return { IsSucces: true };
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2025") {
                return { IsSucces: false, Error_Code: "404" };
            }
            console.error("Update_Pod error:", err);
            return { IsSucces: false, Error_Code: "500" };
        }
    }
    /* ------------------------------------------------ */
    /* ----------- UPDATE MEMBER ROLE ----------------- */
    /* ------------------------------------------------ */
    async Update_Member_Role(podId, userId, role) {
        try {
            await Prisma_Instances.podMember.update({
                where: { podId_userId: { podId, userId } },
                data: { role },
            });
            return { IsSucces: true };
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2025") {
                return { IsSucces: false };
            }
            console.error("Update_Member_Role error:", err);
            return { IsSucces: false };
        }
    }
    /* ------------------------------------------------ */
    /* ---------------- SOFT DELETE ------------------- */
    /* ------------------------------------------------ */
    async Delete_Pod(where) {
        try {
            await Prisma_Instances.pod.update({
                where,
                data: { status: "archived" },
            });
            return { IsSucces: true };
        }
        catch (err) {
            console.error("Delete_Pod error:", err);
            return { IsSucces: false };
        }
    }
    /* ------------------------------------------------ */
    /* ------------ COUNT PODS BY USER ---------------- */
    /* ------------------------------------------------ */
    async Count_Pods_By_User(userId) {
        return Prisma_Instances.pod.count({
            where: { createdById: userId },
        });
    }
}
/* ------------------------------------------------ */
export const PodRepo = new Pod_class();
//# sourceMappingURL=pods.repository.js.map