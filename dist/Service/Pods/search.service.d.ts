import type { Request } from "express";
export declare const searchPodsService: (req: Request) => Promise<{
    pods: {
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
    }[];
}>;
//# sourceMappingURL=search.service.d.ts.map