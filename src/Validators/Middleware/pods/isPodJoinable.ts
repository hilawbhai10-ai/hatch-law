import type { Request, Response, NextFunction } from "express";
import Status_Codes from "../../../Constant/Status_Codes.js";

export const isPodJoinable = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.pod) {
    return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Pod context missing",
      code: Status_Codes.INTERNAL_SERVER_ERROR,
    });
  }

  const pod = req.pod;

  // Already member
  if (pod.isMember) {
    return res.status(Status_Codes.BAD_REQUEST).json({
      success: false,
      message: "Already a member of pod",
      code: Status_Codes.BAD_REQUEST,
    });
  }

  // Pod must be active
  if (pod.status !== "active") {
    return res.status(Status_Codes.FORBIDDEN).json({
      success: false,
      message: "Pod is not active",
      code: Status_Codes.FORBIDDEN,
    });
  }

  // Capacity check
  if (pod.membersCount >= (pod.maxMembers ?? 20)) {
    return res.status(Status_Codes.FORBIDDEN).json({
      success: false,
      message: "Pod is full",
      code: Status_Codes.FORBIDDEN,
    });
  }

  // Join policy check
  if (pod.joinPolicy === "invite_only") {
    try {
      // verify if user has an invite
    }
    catch (error) {
      return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error checking invite status",
        code: Status_Codes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  if (pod.joinPolicy === "approval"){
    try {
      // verify if user has a pending approval request 
    } catch (error) {
      return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error checking approval status",
        code: Status_Codes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  next();
};
