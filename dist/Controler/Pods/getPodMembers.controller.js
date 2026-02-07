import { getPodMembersService } from "../../Service/pods/getPodMembers.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const GetPodMembersController = async (req, res) => {
    try {
        const result = await getPodMembersService(req);
        return res.status(200).json({ success: true, data: result.members });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({ success: false, message: err.message || "Internal", code });
    }
};
//# sourceMappingURL=getPodMembers.controller.js.map