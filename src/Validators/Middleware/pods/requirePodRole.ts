import type { Request, Response, NextFunction } from "express";
import Status_Codes from "../../../Constant/Status_Codes.js";
import type { PodRole } from "@prisma/client";

export const requirePodRole = (...allowedRoles: PodRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.pod) {
      return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Pod context missing",
        code: Status_Codes.INTERNAL_SERVER_ERROR,
      });
    }

    if (!req.pod.isMember || !req.pod.role) {
      return res.status(Status_Codes.FORBIDDEN).json({
        success: false,
        message: "Pod membership required",
        code: Status_Codes.FORBIDDEN,
      });
    }

    if (!allowedRoles.includes(req.pod.role)) {
      return res.status(Status_Codes.FORBIDDEN).json({
        success: false,
        message: "Insufficient pod permissions",
        code: Status_Codes.FORBIDDEN,
      });
    }

    next();
  };
};
