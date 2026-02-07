import type { Request } from "express";
export declare const getPodDetailsService: (req: Request) => Promise<{
    pod: {
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
    };
}>;
//# sourceMappingURL=getPodDetails.service.d.ts.map