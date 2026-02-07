import type { Response, NextFunction } from "express";
import logger from "../../../lib/logger.js";
import crypto from "crypto"
import type { LogSchema } from "../../../types/logger.types.js";
import type AppRequest from "../../../types/Extend_Requests.js";

export const LoggerMiddleware = (req: AppRequest, res: Response, next: NextFunction) => {
  const start = Date.now();
  const request_ID = crypto.randomUUID();

  req.body = req.body ?? {}
  req.body.Start_time = start;
  req.body.request_ID = request_ID;

  res.on("finish", () => {
    if (req.hasError) return; // skip if error handled elsewhere

    const duration = Date.now() - start;

    if (duration > 4000) {
      logger.warn({
        level: "warn",
        message: "Time taken too long",
        request_id: request_ID,
        service_name: "Express",
        method: req.method,
        url: req.originalUrl,
        status_code: res.statusCode,
        duration,
        ip_address: req.ip
      } as LogSchema);
    }

    logger.info({
      level: "info",
      message: "Succeeded",
      request_id: request_ID,
      service_name: "Express",
      method: req.method,
      url: req.originalUrl,
      status_code: res.statusCode,
      duration,
      ip_address: req.ip
    } as LogSchema);
  });

  next();
};
