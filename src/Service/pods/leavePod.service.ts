import type { Request } from "express";
import Status_Codes from "../../Constant/Status_Codes.js";
import { PodRepo } from "../../Repository/pods.repository.js";

export const leavePodService = async (req: Request) => {
  const userId = req.user?.id;
  const pod = req.pod;

  if (!userId || !pod) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Pod or user context missing",
    };
  }

  // Owners cannot leave (prevents orphan pods)
  if (pod.role === "owner") {
    throw {
      code: Status_Codes.FORBIDDEN,
      message: "Pod owner cannot leave. Delete or transfer ownership.",
    };
  }

  // OPTIONAL: block admin leaving (your current rule)
  if (pod.role === "admin") {
    throw {
      code: Status_Codes.FORBIDDEN,
      message: "Admins cannot leave pod",
    };
  }

  const result = await PodRepo.Remove_Member(
    pod.uuid,
    userId
  );

  if (!result.IsSucces) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Failed to leave pod",
    };
  }

  return { success: true };
};
