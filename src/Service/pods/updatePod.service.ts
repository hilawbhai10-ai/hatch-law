import { PodRepo } from "../../Repository/pods.repository.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request } from "express";

export const updatePodService = async (req: Request) => {
  // const podData = req.pod?.data;
  const updatePayload = req.body;

  if (!req.pod) {
    throw {
      code: Status_Codes.NOT_FOUND,
      message: "Pod not found",
    };
  }

  const hasPermission =
    req.pod?.isMember && (req.pod?.role === "owner" || req.pod?.role === "admin");

  if (!hasPermission) {
    throw {
      code: Status_Codes.FORBIDDEN,
      message: "Insufficient permissions",
    };
  }

  // whitlisting fields

//   const allowedFields = ["title", "description", "visibility"];
// const updatePayload = Object.fromEntries(
//   Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
// );


  const result = await PodRepo.Update_Pod(
    { uuid: req.pod.uuid },
    updatePayload
  );

  if (!result?.IsSucces) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Failed to update pod",
    };
  }

  return {
    success: true,
    message: "Pod updated successfully",
  };
};
