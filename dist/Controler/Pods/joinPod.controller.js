import { joinPodService } from "../../Service/pods/joinPod.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const joinPodController = async (req, res) => {
    try {
        await joinPodService(req);
        return res.status(200).json({ success: true, message: "Pod joined successfully" });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({
            success: false,
            message: err.message || "Internal",
            code,
        });
    }
};
//# sourceMappingURL=joinPod.controller.js.map