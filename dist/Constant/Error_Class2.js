import WS_Status_codes from "./WS_Status_codes.js";
export class AppError2 extends Error {
    statusCode;
    service_name;
    error_caused;
    err;
    error_detail;
    constructor(message, statusCode, service_name, error_caused, error_detail, err) {
        super(message);
        this.statusCode = statusCode;
        this.service_name = service_name;
        this.error_caused = error_caused;
        this.error_detail = error_detail;
        this.err = err;
        // Fix prototype chain
        Object.setPrototypeOf(this, AppError2.prototype);
        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=Error_Class2.js.map