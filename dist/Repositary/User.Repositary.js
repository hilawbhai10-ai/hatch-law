import Prisma_Instances from "../config/Prisma_Instances.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
class User_class {
    async Get_User(where) {
        try {
            const User = await Prisma_Instances.user.findUnique({ where: where });
            return {
                Obj: User,
                IsSucces: true,
            };
        }
        catch (e) {
            return {
                IsSucces: false,
                Error_Code: "500",
            };
        }
    }
    async Create_User(Data) {
        let User;
        try {
            User = await Prisma_Instances.user.create({
                data: Data,
            });
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002") {
                return { IsSucces: false, Error_Code: err.code };
            }
            console.log(err);
            return { IsSucces: false, Error_Code: "500" };
        }
        return { IsSucces: true };
    }
    async IsUserExists(email, username) {
        try {
            if (!email && !username) {
                return { Email: false, Username: false, Error_Code: "400" };
            }
            const users = await Prisma_Instances.user.findMany({
                where: {
                    OR: [
                        email ? { email: email.toLowerCase() } : undefined,
                        username ? { username: username.toLowerCase() } : undefined,
                    ].filter(Boolean),
                },
                select: {
                    email: true,
                    username: true,
                },
            });
            return {
                Email: !!email && users.some((u) => u.email === email?.toLowerCase()),
                Username: !!username &&
                    users.some((u) => u.username === username?.toLowerCase()),
                Error_Code: "200",
            };
        }
        catch (err) {
            console.error(err);
            return { Email: false, Username: false, Error_Code: "500" };
        }
    }
    async EditUser(where, data) {
        try {
            await Prisma_Instances.user.update({
                where,
                data,
            });
            return { Succeeded: true };
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002") {
                return {
                    Succeeded: false,
                    Error_code: err.code,
                };
            }
            return { Succeeded: false };
        }
    }
    async Get_User_without_err_handaling(where, withPods = false) {
        if (withPods) {
            return Prisma_Instances.user.findUnique({
                where,
                include: { pods: { include: { pod: true } } },
            });
        }
        return Prisma_Instances.user.findUnique({
            where,
        });
    }
    async Get_Pods(where) {
        const user = await Prisma_Instances.user.findUnique({
            where,
            include: {
                pods: {
                    include: {
                        pod: true,
                    },
                },
            },
        });
        return {
            Pods: user?.pods.map((pm) => ({
                ...pm.pod,
                role: pm.role,
                joinedAt: pm.joinedAt,
            })),
            Maximum_Pods: user?.maximumPods,
        };
    }
}
export default User_class;
//# sourceMappingURL=User.Repositary.js.map