import Status_Codes from "../../../Constant/Status_Codes.js";
import { PodRepo } from "../../../Repository/pods.repository.js";
export const loadPodContext = async (req, res, next) => {
    try {
        const uuid = req.params.uuid ||
            req.params.podId ||
            req.body.uuid ||
            req.body.podId;
        if (!uuid || typeof uuid !== "string") {
            return res
                .status(Status_Codes.BAD_REQUEST)
                .json({ message: "Pod UUID missing or invalid" });
        }
        if (req.pod?.uuid === uuid)
            return next();
        const [podResult, membership, membersCount] = await Promise.all([
            PodRepo.Get_Pod({
                where: { uuid },
                select: {
                    uuid: true,
                    visibility: true,
                    status: true,
                    joinPolicy: true,
                    maxMembers: true,
                },
            }),
            req.user?.id ? PodRepo.Get_Membership(uuid, req.user.id) : null,
            PodRepo.Member_Count(uuid),
        ]);
        if (!podResult.IsSucces) {
            return res
                .status(Status_Codes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to load pod" });
        }
        if (!podResult.Obj) {
            return res
                .status(Status_Codes.NOT_FOUND)
                .json({ message: "Pod not found" });
        }
        if (podResult.Obj.visibility === "private" && !membership) {
            return res
                .status(Status_Codes.FORBIDDEN)
                .json({ message: "Private pod" });
        }
        req.pod = {
            uuid: podResult.Obj.uuid,
            visibility: podResult.Obj.visibility,
            status: podResult.Obj.status,
            joinPolicy: podResult.Obj.joinPolicy,
            maxMembers: podResult.Obj.maxMembers,
            membersCount,
            isMember: !!membership,
            role: membership?.role ?? null,
        };
        next();
    }
    catch (err) {
        console.error("loadPodContext error:", err);
        res
            .status(Status_Codes.INTERNAL_SERVER_ERROR)
            .json({ message: "Pod context load failed" });
    }
};
//# sourceMappingURL=loadPodContext.js.map