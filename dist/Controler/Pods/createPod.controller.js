import { createPodService } from "../../Service/pods/createPod.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const CreatePodController = async (req, res) => {
    try {
        await createPodService(req);
        return res.status(200).json({ success: true, message: "Pod created successfully" });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({ success: false, message: err.message || "Internal", code });
    }
};
//# sourceMappingURL=createPod.controller.js.map