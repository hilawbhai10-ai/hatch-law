import type { Request, Response } from "express";
import { searchPodsService } from "../../Service/pods/search.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";

export const SearchPodsController = async (req: Request, res: Response) => {
  try {
    const result = await searchPodsService(req as any);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
    return res.status(code).json({ success: false, message: err.message || "Internal", code });
  }
};