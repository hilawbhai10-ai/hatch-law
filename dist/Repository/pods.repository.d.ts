import type { Pod, Prisma, PodRole } from "@prisma/client";
type PodPayload<T extends Prisma.PodSelect | undefined> = T extends Prisma.PodSelect ? Prisma.PodGetPayload<{
    select: T;
}> : Pod;
type Pod_Schema = {
    Obj?: Pod | null;
    IsSucces: boolean;
    Error_Code?: string | null;
};
declare class Pod_class {
    Get_Pod<T extends Prisma.PodSelect | undefined = undefined>(args: {
        where: Prisma.PodWhereUniqueInput;
        select?: T;
    }): Promise<{
        Obj: PodPayload<T> | null;
        IsSucces: boolean;
        Error_Code?: string;
    }>;
    Get_Pod_With_Members(where: Prisma.PodWhereUniqueInput): Promise<({
        members: ({
            user: {
                email: string | null;
                id: string;
                username: string;
                password: string | null;
                avatarUrl: string | null;
                accountStatus: import("@prisma/client").$Enums.AccountStatus;
                maximumPods: number;
                createdPodsCount: number;
                subscriptionTier: import("@prisma/client").$Enums.SubscriptionTier;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            podId: string;
            userId: string;
            role: import("@prisma/client").$Enums.PodRole;
            joinedAt: Date;
        })[];
    } & {
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
    }) | null>;
    Get_Membership(podId: string, userId: string): Promise<{
        role: import("@prisma/client").$Enums.PodRole;
    } | null>;
    Member_Count(podId: string): Promise<number>;
    Get_Public_Pods(limit?: number, offset?: number): Promise<{
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
    }[]>;
    Create_Pod(data: Prisma.PodCreateInput, ownerId: string): Promise<Pod_Schema>;
    Add_Member(podId: string, userId: string, role?: PodRole): Promise<{
        IsSucces: boolean;
        Error_Code?: string;
    }>;
    Remove_Member(podId: string, userId: string): Promise<{
        IsSucces: boolean;
    }>;
    Create_Message(podId: string, channelId: string | null, senderId: string, content: string): Promise<{
        IsSucces: boolean;
        Obj?: any;
        Error_Code?: string;
    }>;
    Can_Join(podId: string): Promise<{
        CanJoin: boolean;
        Error_Code: string;
    }>;
    Update_Pod(where: Prisma.PodWhereUniqueInput, data: Prisma.PodUpdateInput): Promise<{
        IsSucces: boolean;
        Error_Code?: string;
    }>;
    Update_Member_Role(podId: string, userId: string, role: PodRole): Promise<{
        IsSucces: boolean;
    }>;
    Delete_Pod(where: Prisma.PodWhereUniqueInput): Promise<{
        IsSucces: boolean;
    }>;
    Count_Pods_By_User(userId: string): Promise<number>;
}
export declare const PodRepo: Pod_class;
export {};
//# sourceMappingURL=pods.repository.d.ts.map