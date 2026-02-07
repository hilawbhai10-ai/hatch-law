import Status_Codes from "../../../Constant/Status_Codes.js";
export const requirePodMember = (req, res, next) => {
    if (!req.pod) {
        return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Pod context missing",
            code: Status_Codes.INTERNAL_SERVER_ERROR,
        });
    }
    if (!req.pod.isMember) {
        return res.status(Status_Codes.FORBIDDEN).json({
            success: false,
            message: "Pod membership required",
            code: Status_Codes.FORBIDDEN,
        });
    }
    next();
};
//# sourceMappingURL=requirePodMember.js.map