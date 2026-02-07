export declare const GetUserServiceLayer: (User_ID: string) => Promise<{
    id: string;
    username: string;
    email: string | null;
    avatarUrl: string | null;
    maximumPods: number;
    accountStatus: import("@prisma/client").$Enums.AccountStatus;
} | null>;
export declare const GetPublicUserServiceLayer: (User_ID: string) => Promise<{
    id: string;
    username: string;
    avatarUrl: string | null;
} | null>;
//# sourceMappingURL=user.services.d.ts.map