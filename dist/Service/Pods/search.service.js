import { PodRepo } from "../../Repository/pods.repository.js";
export const searchPodsService = async (req) => {
    const q = String(req.query.q || "").toLowerCase();
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const pods = await PodRepo.Get_Public_Pods(limit, offset);
    if (!q)
        return { pods };
    const filtered = pods.filter((p) => (p.title || "").toLowerCase().includes(q));
    return { pods: filtered };
};
//# sourceMappingURL=search.service.js.map