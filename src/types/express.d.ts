import type {
  User,
  Pod,
  PodMember,
  PodJoinPolicy,
  PodStatus,
  PodVisibility,
  PodRole,
} from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        /** always present after auth */
        id: string;

        /** lightweight context (fast) */
        context?: {
          username: string;
          email: string | null;
          createdPodsCount: number;
          subscriptionTier: "Free" | "Premium" | "Elite";
        };

        // /** heavy user object (optional) */
        // data?: User;

        // /** memberships (optional) */
        // pods?: PodMember[];
      };

      pod?: {
        uuid: string;

        visibility: PodVisibility;
        status: PodStatus;
        joinPolicy: PodJoinPolicy;

        isMember: boolean;
        role?: PodRole | null;

        membersCount: number;
        maxMembers?: number;

        // optional heavy object
        // data?: Pod;
      } | null;
    }
  }
}

export {};
