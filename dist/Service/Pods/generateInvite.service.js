import Status_Codes from "../../Constant/Status_Codes.js";
import crypto from "crypto";
export const generateInviteService = async (req) => {
    const podId = req.pod?.uuid;
    const role = req.pod?.role;
    const isMember = req.pod?.isMember;
    if (!podId) {
        throw {
            code: Status_Codes.NOT_FOUND,
            message: "Pod not found",
        };
    }
    if (!["owner", "admin", "mod"].includes(role || "")) {
        throw {
            code: Status_Codes.FORBIDDEN,
            message: "Insufficient permission to generate invite",
        };
    }
    const token = `${podId}-${crypto.randomBytes(6).toString("hex")}`;
    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const link = `${baseUrl}/invite/${token}`;
    return {
        success: true,
        token,
        link,
    };
};
//# sourceMappingURL=generateInvite.service.js.map