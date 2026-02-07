import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request } from "express";
import { UserRepo } from "../../Repository/user.repository.js";

export const getPodListService = async (req: Request) => {
  const userId = req.user?.id;
  if (!userId) {
    throw { code: Status_Codes.UNAUTHORIZED, message: "Unauthorized" };
  }

  const podsData = await UserRepo.Get_Pods({ id: userId });

  return { pods: podsData.Pods ?? [] };
};