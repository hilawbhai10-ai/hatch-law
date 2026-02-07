import type { ErrorCausedBy } from "../types/logger.types.js";
import type InternalServerCode from "./Internal_Service_Code.js";
export declare class AppError2 extends Error {
    statusCode?: number | InternalServerCode;
    service_name: string;
    error_caused: ErrorCausedBy;
    err?: string | undefined;
    error_detail?: string | undefined;
    constructor(message: string, statusCode: number, service_name: string, error_caused: ErrorCausedBy, error_detail?: string, err?: string);
}
//# sourceMappingURL=Error_Class2.d.ts.map