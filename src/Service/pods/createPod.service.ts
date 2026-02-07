import { PodRepo } from "../../Repository/pods.repository.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request } from "express";
import type { Pod, Prisma } from "@prisma/client";

export const createPodService = async (req: Request) => {
  const userId = req.user?.id;
  const body = req.body;

  if (!userId) {
    throw {
      code: Status_Codes.UNAUTHORIZED,
      message: "Unauthorized",
    };
  }

  if (!body?.name) {
    throw {
      code: Status_Codes.BAD_REQUEST,
      message: "Pod name is required",
    };
  }

  const podData: Prisma.PodCreateInput = {
    name: body.name,
    description: body.description ?? null,
    category: body.category ?? "general",
    tags: body.tags ?? [],

    visibility: body.visibility ?? "public",
    joinPolicy: body.joinPolicy ?? "open",
    maxMembers: body.maxMembers ?? 50,

    accountabilityStartDate: body.accountabilityStartDate
      ? new Date(body.accountabilityStartDate)
      : new Date(),

    accountabilityEndDate: body.accountabilityEndDate
      ? new Date(body.accountabilityEndDate)
      : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // default 2 weeks

    accountabilityCadence: body.accountabilityCadence ?? "weekly",

    podPfp: body.podPfp ?? null,
    coverImage: body.coverImage ?? null,
    createdAt: new Date(Date.now()),

    createdBy: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await PodRepo.Create_Pod(podData, userId);

  if (!result.IsSucces || !result.Obj) {
    if (result.Error_Code === "P2002") {
      throw {
        code: Status_Codes.Conflit,
        message: "Pod with this name already exists",
      };
    }
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Failed to create pod",
    };
  }

  return { pod: result.Obj };
};
