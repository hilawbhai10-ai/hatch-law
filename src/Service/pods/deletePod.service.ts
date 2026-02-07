import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request } from "express";
import { PodRepo } from "../../Repository/pods.repository.js";

export const deletePodService = async (req: Request) => {
  const podId = req.pod?.uuid;

  if (!podId) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Pod context missing",
    };
  }

  const result = await PodRepo.Delete_Pod({ uuid: podId });

  if (!result.IsSucces) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Failed to delete pod",
    };
  }

  return { success: true };
};
