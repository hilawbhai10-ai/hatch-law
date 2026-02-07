import type { Request, Response, NextFunction } from "express";
import Status_Codes from "../../../Constant/Status_Codes.js";
// import { UserRepo } from "../../../Repository/user.repository.js";

/**
 * Centralized subscription limits
 * Keeps business logic consistent across app
 */
const POD_LIMITS = {
  Free: 3,
  Premium: 10,
  Elite: 30,
} as const;

export const podCreateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user?.id) {
      return res.status(Status_Codes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
        code: Status_Codes.UNAUTHORIZED,
      });
    }

    const ctx = req.user?.context;

    if (!ctx) {
      return res.status(Status_Codes.UNAUTHORIZED).json({
        success: false,
        message: "User context missing",
        code: Status_Codes.UNAUTHORIZED,
      });
    }

    const LIMITS = {
      Free: 3,
      Premium: 10,
      Elite: 30,
    } as const;

    if (ctx.createdPodsCount >= LIMITS[ctx.subscriptionTier]) {
      return res.status(Status_Codes.FORBIDDEN).json({
        success: false,
        message: "Pod creation limit reached",
        code: Status_Codes.FORBIDDEN,
      });
    }

    next();
  } catch (err) {
    console.error("podCreateLimitMiddleware error:", err);

    return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal error",
      code: Status_Codes.INTERNAL_SERVER_ERROR,
    });
  }
};
