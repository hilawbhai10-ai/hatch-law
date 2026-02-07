import type { User, PodMember } from "@prisma/client";
export type UserWithPods = User & {
    pods: PodMember[];
};
//# sourceMappingURL=prisma.d.ts.map