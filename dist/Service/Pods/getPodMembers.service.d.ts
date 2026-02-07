import type { Request } from "express";
export declare const getPodMembersService: (req: Request) => Promise<{
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
}>;
//# sourceMappingURL=getPodMembers.service.d.ts.map