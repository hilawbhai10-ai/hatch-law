import Status_Codes from "../../Constant/Status_Codes.js";
import { PodRepo } from "../../Repository/pods.repository.js";
import type { Request } from "express";
import { joinUserToPodSockets } from "../../Controler/hybridSocket/socketPodJoiner.js";

export const joinPodService = async (req: Request) => {
  const userId = req.user?.id;
  const pod = req.pod;

  if (!userId || !pod) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Pod or user context missing",
    };
  }

  const result = await PodRepo.Add_Member(
    pod.uuid,
    userId,
    "member"
  );

  if (!result.IsSucces) {
    throw {
      code: Status_Codes.INTERNAL_SERVER_ERROR,
      message: "Failed to join pod",
    };
  }

  //  user join the pod's socket room for real-time features
  joinUserToPodSockets(userId, pod.uuid)

  return { success: true };

};
