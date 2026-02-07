import type { Request, Response } from "express";
import { assignRoleService } from "../../Service/pods/assignRole.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";

export const AssignPodRoleController = async (req: Request, res: Response) => {
  try {
    await assignRoleService(req as any);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({ success: false, message: err.message || "Internal", code });
  }
};