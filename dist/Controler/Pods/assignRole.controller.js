import { assignRoleService } from "../../Service/pods/assignRole.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const AssignPodRoleController = async (req, res) => {
    try {
        await assignRoleService(req);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({ success: false, message: err.message || "Internal", code });
    }
};
//# sourceMappingURL=assignRole.controller.js.map