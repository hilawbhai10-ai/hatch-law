import { joinPodService } from "../../services/pods/join.service.js";
export const JoinPodController = async (req, res, next) => {
    try {
        const body = req.body ?? {};
        const user = body.User;
        if (!user || !user.id)
            return res.status(401).json({ success: false, error: "Unauthorized" });
        const { isPublic, podId, requestId } = body;
        const result = await joinPodService(user.id, { isPublic, podId, requestId });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=pods.controller.js.map