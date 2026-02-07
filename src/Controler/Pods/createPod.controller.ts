import type { Request, Response } from "express";
import { createPodService } from "../../Service/pods/createPod.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";

export const CreatePodController = async (req: Request, res: Response) => {
  try {
    await createPodService(req as any);
    return res.status(200).json({ success: true, message: "Pod created successfully" });
  } catch (err: any) {
    const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({ success: false, message: err.message || "Internal", code });
  }
};