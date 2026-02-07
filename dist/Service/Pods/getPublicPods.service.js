import { PodRepo } from "../../Repository/pods.repository.js";
export const getPublicPodsService = async (req) => {
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const pods = await PodRepo.Get_Public_Pods(limit, offset);
    return { pods };
};
//# sourceMappingURL=getPublicPods.service.js.map