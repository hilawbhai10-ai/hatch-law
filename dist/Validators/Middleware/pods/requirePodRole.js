import Status_Codes from "../../../Constant/Status_Codes.js";
export const requirePodRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.pod) {
            return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Pod context missing",
                code: Status_Codes.INTERNAL_SERVER_ERROR,
            });
        }
        if (!req.pod.isMember || !req.pod.role) {
            return res.status(Status_Codes.FORBIDDEN).json({
                success: false,
                message: "Pod membership required",
                code: Status_Codes.FORBIDDEN,
            });
        }
        if (!allowedRoles.includes(req.pod.role)) {
            return res.status(Status_Codes.FORBIDDEN).json({
                success: false,
                message: "Insufficient pod permissions",
                code: Status_Codes.FORBIDDEN,
            });
        }
        next();
    };
};
//# sourceMappingURL=requirePodRole.js.map