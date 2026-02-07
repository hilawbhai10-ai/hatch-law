import { PodRepo } from "../../Repository/pods.repository.js"; 
import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request } from "express";

export const getPodMembersService = async (req: Request) => {
  const podId = req.pod?.uuid || req.params.podId;

  if (!podId) throw { code: Status_Codes.BAD_REQUEST, message: "Pod id missing" };

  // const pod = await PodRepo.Get_Pod_With_Members({ uuid: podId });

  // const pod = { members };

    // will need to do something about getting members from loaded context
  const pod = await PodRepo.Get_Pod_With_Members({ uuid: podId });
  if (!pod) throw { code: Status_Codes.NOT_FOUND, message: "Pod not found" };

  return { members: pod.members ?? [] };
};