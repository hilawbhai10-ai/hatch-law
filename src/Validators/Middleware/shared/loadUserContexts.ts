import { UserRepo } from "../../../Repository/user.repository.js"; 
import type { UserWithPods } from "../../../types/prisma.js";
import Status_Codes from "../../../Constant/Status_Codes.js";
import type { Request, Response, NextFunction } from "express";
import type { User } from "@prisma/client";


// export const UserRepo = new User_class();

export const loadUserContext = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.id) {
      return res
        .status(Status_Codes.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized", code: Status_Codes.UNAUTHORIZED });
    }

   if (req.user.context) {
      return next();
    }

    const userResult = await UserRepo.Get_User_without_err_handaling(
      { id: req.user.id },
      false, // exclude pods
    );

    if (!userResult) {
      return res
        .status(Status_Codes.NOT_FOUND)
        .json({ success: false, message: "User not found", code: Status_Codes.NOT_FOUND });
    }

    const user = userResult as User;

    req.user.context = {
      username: user.username,
      email: user.email,
      createdPodsCount: user.createdPodsCount,
      subscriptionTier: user.subscriptionTier,
    };

    next();
  } catch (err) {
    console.error("loadUserContext error:", err);
    return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to load user context",
      code: Status_Codes.INTERNAL_SERVER_ERROR,
    });
  }
};
