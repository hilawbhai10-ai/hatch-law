import type { ErrorCausedBy } from "../types/logger.types.js";
import WS_Status_codes from "./WS_Status_codes.js";
import type InternalServerCode from "./Internal_Service_Code.js";

export class AppError2 extends Error {
  statusCode?: number | InternalServerCode;
  service_name: string;
  error_caused: ErrorCausedBy;
  err? : string | undefined;
  error_detail?: string | undefined;

  constructor(message: string, statusCode: number, service_name: string, error_caused: ErrorCausedBy, error_detail?: string,err? : string) {
    super(message);
    this.statusCode = statusCode;
    this.service_name = service_name;
    this.error_caused = error_caused;
    this.error_detail = error_detail;
    this.err = err

    // Fix prototype chain
    Object.setPrototypeOf(this, AppError2.prototype);

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
