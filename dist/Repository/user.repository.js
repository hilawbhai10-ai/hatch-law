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
    async isUserExists(email, username) {
        if (!email && !username) {
            return { emailExists: false, usernameExists: false };
        }
        const [emailUser, usernameUser] = await Promise.all([
            email
                ? Prisma_Instances.user.findFirst({
                    where: {
                        email: { equals: email, mode: "insensitive" },
                    },
                    select: { id: true },
                })
                : null,
            username
                ? Prisma_Instances.user.findFirst({
                    where: {
                        username: { equals: username, mode: "insensitive" },
                    },
                    select: { id: true },
                })
                : null,
        ]);
        return {
            emailExists: !!emailUser,
            usernameExists: !!usernameUser,
        };
    }
    async Get_User_without_err_handaling(where, includePods = false) {
        const query = { where };
        if (includePods) {
            query.include = { pods: true };
        }
        return Prisma_Instances.user.findUnique(query);
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
export const UserRepo = new User_class();
export default User_class;
//# sourceMappingURL=user.repository.js.map