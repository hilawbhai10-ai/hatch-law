import Status_Codes from "../Constant/Status_Codes.js";
import WS_Status_codes from "../Constant/WS_Status_codes.js";
export type LogLevel = "info" | "warn" | "error";
export type ErrorCausedBy = "DB" | "Redis" | "ThirdParty" | "Internal" | "User";
export interface LogSchema {
    level: LogLevel;
    message: string;
    request_id?: string;
    service_name: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "WS";
    url?: string;
    status_code?: Status_Codes | WS_Status_codes;
    duration?: number;
    ip_address?: string;
    error_caused?: ErrorCausedBy;
    error_detail?: string;
    stack?: string;
    user_id?: string;
}
//# sourceMappingURL=logger.types.d.ts.map