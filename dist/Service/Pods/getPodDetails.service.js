import Status_Codes from "../../Constant/Status_Codes.js";
import { PodRepo } from "../../Repository/pods.repository.js";
export const getPodDetailsService = async (req) => {
    const podId = req.pod?.uuid || req.params.podId;
    if (!podId)
        throw { code: Status_Codes.BAD_REQUEST, message: "Pod id missing" };
    const pod = await PodRepo.Get_Pod_With_Members({ uuid: podId });
    if (!pod)
        throw { code: Status_Codes.NOT_FOUND, message: "Pod not found" };
    return { pod };
};
//# sourceMappingURL=getPodDetails.service.js.map