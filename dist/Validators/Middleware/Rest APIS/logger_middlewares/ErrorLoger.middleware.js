import logger from "../../../../lib/logger.js";
export const ErrorLogermiddleware = (err, req, res, next) => {
    const request_ID = req.body.request_ID;
    const start = req.body.Start_time;
    const duration = start ? Date.now() - start : undefined;
    logger.error({
        level: "error",
        message: err.message,
        request_id: request_ID,
        service_name: err.service_name || "UnknownService",
        method: req.method,
        url: req.originalUrl,
        status_code: err.statusCode || 500,
        duration,
        ip_address: req.ip,
        error_caused: err.error_caused || "Internal",
        error_detail: err.error_detail || err.message,
        stack: err.stack
    });
    if (!res.headersSent) { // prevent "headers already sent" errors
        res.status(err.statusCode || 500).json({
            success: false,
            request_id: request_ID,
            message: "Internal Server Error"
        });
    }
};
//# sourceMappingURL=ErrorLoger.middleware.js.map