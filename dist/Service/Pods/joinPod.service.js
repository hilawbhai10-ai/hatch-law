import Status_Codes from "../../Constant/Status_Codes.js";
import { PodRepo } from "../../Repository/pods.repository.js";
export const joinPodService = async (req) => {
    const userId = req.user?.id;
    const pod = req.pod;
    if (!userId || !pod) {
        throw {
            code: Status_Codes.INTERNAL_SERVER_ERROR,
            message: "Pod or user context missing",
        };
    }
    const result = await PodRepo.Add_Member(pod.uuid, userId, "member");
    if (!result.IsSucces) {
        throw {
            code: Status_Codes.INTERNAL_SERVER_ERROR,
            message: "Failed to join pod",
        };
    }
    return { success: true };
};
//# sourceMappingURL=joinPod.service.js.map