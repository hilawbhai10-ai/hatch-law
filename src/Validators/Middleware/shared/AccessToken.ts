import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import Status_Codes from "../../../Constant/Status_Codes.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkeyforhatchtempauth";

export const AccessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(Status_Codes.UNAUTHORIZED).json({
      error: "Authorization header missing"
    });
  }

  const token = authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({ error: "Token missing" });
}

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    req.user = { id: decoded.userId };

    next();

  } catch {
    return res.status(Status_Codes.UNAUTHORIZED).json({
      error: "Invalid or expired access token"
    });
  }
};
