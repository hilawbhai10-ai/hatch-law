import logger from "../../../lib/logger.js";
import crypto from "crypto";
export const LoggerMiddleware = (req, res, next) => {
    const start = Date.now();
    const request_ID = crypto.randomUUID();
    req.body = req.body ?? {};
    req.body.Start_time = start;
    req.body.request_ID = request_ID;
    res.on("finish", () => {
        if (req.hasError)
            return; // skip if error handled elsewhere
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
            });
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
        });
    });
    next();
};
//# sourceMappingURL=logger.middleware.js.map