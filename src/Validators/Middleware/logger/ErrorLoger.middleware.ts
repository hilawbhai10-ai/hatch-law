import type {Response,NextFunction} from "express";
import type AppRequest from "../../../types/Extend_Requests.js";
import logger from "../../../lib/logger.js";
import Status_Codes from "../../../Constant/Status_Codes.js";
import type { LogSchema } from "../../../types/logger.types.js";


export const ErrorLogermiddleware = (err: any, req: AppRequest, res: Response, next: NextFunction) => {
  const request_ID = req.body.request_ID;
  const start = req.body.Start_time;
  const duration = start ? Date.now() - start : undefined;

  const statusCode = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;

  logger.error({
    level: "error",
    message: err.message,
    request_id: request_ID,
    service_name: err.service_name || "UnknownService",
    method: req.method,
    url: req.originalUrl,
    status_code: statusCode,
    duration,
    ip_address: req.ip,
    error_caused: err.error_caused || "Internal",
    error_detail: err.error_detail || err.message,
    stack: err.stack
  } as LogSchema);

  if (!res.headersSent) {  // prevent "headers already sent" errors
    res.status(statusCode).json({
      success: false,
      request_id: request_ID,
      message: err.message || "Internal Server Error",
      code: statusCode
    });
  }
};

