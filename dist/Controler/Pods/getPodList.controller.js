import { getPodListService } from "../../Service/pods/getPodList.service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const GetPodListController = async (req, res) => {
    try {
        const result = await getPodListService(req);
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        const code = err.code || err.statusCode || Status_Codes.INTERNAL_SERVER_ERROR;
        return res.status(code).json({ success: false, message: err.message || "Internal", code });
    }
};
//# sourceMappingURL=getPodList.controller.js.map