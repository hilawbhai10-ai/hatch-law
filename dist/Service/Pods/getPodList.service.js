import Status_Codes from "../../Constant/Status_Codes.js";
import { UserRepo } from "../../Repository/user.repository.js";
export const getPodListService = async (req) => {
    const userId = req.user?.id;
    if (!userId) {
        throw { code: Status_Codes.UNAUTHORIZED, message: "Unauthorized" };
    }
    const podsData = await UserRepo.Get_Pods({ id: userId });
    return { pods: podsData.Pods ?? [] };
};
//# sourceMappingURL=getPodList.service.js.map