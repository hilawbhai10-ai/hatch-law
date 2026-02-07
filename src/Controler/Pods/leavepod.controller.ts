import type { Request, Response } from "express";
import { leavePodService } from "../../Service/pods/leavePod.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";

export const leavePodController = async (req: Request, res: Response) => {
  try {
    await leavePodService(req);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({
      success: false,
      message: err.message || "Internal",
      code,
    });
  }
};
