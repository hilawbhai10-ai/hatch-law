import type { User, Prisma } from "@prisma/client";
type User_Schema = {
    Obj?: User | null;
    IsSucces: boolean;
    Error_Code?: string | null;
};
declare class User_class {
    Get_User(where: Prisma.UserWhereUniqueInput): Promise<User_Schema>;
    Create_User(Data: Prisma.UserCreateInput): Promise<User_Schema>;
    IsUserExists(email?: string, username?: string): Promise<{
        Email: boolean;
        Username: boolean;
        Error_Code: string;
    }>;
    EditUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<{
        Succeeded: boolean;
        Error_code?: string;
    }>;
    Get_User_without_err_handaling(where: Prisma.UserWhereUniqueInput, withPods?: boolean): Promise<{
        email: string | null;
        id: string;
        username: string;
        password: string | null;
        avatarUrl: string | null;
        accountStatus: import("@prisma/client").$Enums.AccountStatus;
        maximumPods: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    Get_Pods(where: Prisma.UserWhereUniqueInput): Promise<{
        Pods: {
            role: import("@prisma/client").$Enums.PodRole;
            joinedAt: Date;
            uuid: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            category: string;
            tags: string[];
            visibility: import("@prisma/client").$Enums.PodVisibility;
            status: import("@prisma/client").$Enums.PodStatus;
            joinPolicy: import("@prisma/client").$Enums.PodJoinPolicy;
            maxMembers: number;
            accountabilityStartDate: Date;
            accountabilityEndDate: Date;
            accountabilityCadence: import("@prisma/client").$Enums.AccountabilityCadence;
            podPfp: string | null;
            coverImage: string | null;
            activityScore: number;
            createdById: string;
        }[] | undefined;
        Maximum_Pods: number | undefined;
    }>;
}
export default User_class;
//# sourceMappingURL=user.repository.d.ts.map