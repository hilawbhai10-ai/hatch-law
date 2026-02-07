import UserRepo from "../../Repositary/user.repository.js";
import { Pods } from "../../config/Ques/PodsFinder.js";
import Redis_Client_Workers from "../../config/Redis_Instances_Workers.js";
import { QueueEvents } from "bullmq";
import logger from "../../lib/logger.js";
const User = new UserRepo();
const PodsFinderEvent = new QueueEvents("PodsFinder", { connection: Redis_Client_Workers });
export async function joinPodService(userId, opts = {}) {
    // fetch user pods / limits
    const podsData = await User.Get_Pods({ id: userId });
    if (!podsData)
        throw new Error("Failed to fetch user pod data");
    const podsCount = podsData.Pods?.length ?? 0;
    const maximum = podsData.Maximum_Pods ?? 5;
    if (podsCount >= maximum) {
        throw new Error("User maximum pods limit reached");
    }
    if (opts.isPublic) {
        try {
            const job = await Pods.add("find-pods", {
                UserID: userId,
                Already_Existing_Pods: podsData.Pods,
                requestId: opts.requestId,
            });
            // wait until worker resolves the job
            const result = await job.waitUntilFinished(PodsFinderEvent);
            return result;
        }
        catch (err) {
            logger.error(err, { service: "joinPodService" });
            throw new Error("Failed to find pods");
        }
    }
    if (opts.podId) {
        // invite/invite-link flow - TODO: implement proper DB mutation and validations
        // For now return a placeholder response
        return { success: true, message: "Invite/join flow not yet implemented" };
    }
    throw new Error("Invalid join parameters");
}
//# sourceMappingURL=join.service.js.map