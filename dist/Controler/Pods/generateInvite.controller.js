import { generateInviteService } from "../../Service/pods/generateInvite.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const GeneratePodInviteLinkController = async (req, res) => {
    try {
        const result = await generateInviteService(req);
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({ success: false, message: err.message || "Internal", code });
    }
};
//# sourceMappingURL=generateInvite.controller.js.map