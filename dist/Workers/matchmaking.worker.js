import { Worker } from "bullmq";
import Redis_Client_Workers from "../config/Redis_Instances_Workers.js";
import { PodRepo } from "../Repository/pods.repository.js";
import { io } from "../realtime/index.js";
export const matchmakingWorker = new Worker("pod-matchmaking", async (job) => {
    const { userId, requestId, excludedPodIds } = job.data;
    // 1. Find candidate pods
    const pods = await PodRepo.Get_Public_Pods(50, 0);
    const eligible = pods.filter((p) => p.status === "active" &&
        !excludedPodIds.includes(p.uuid));
    if (!eligible.length) {
        io.to(`user:${userId}`).emit("pod:match:failed", {
            requestId,
            reason: "No pods available",
        });
        return;
    }
    // 2. Simple scoring (can evolve later)
    const matchedPod = eligible[0];
    // 3. Notify user (socket only)
    io.to(`user:${userId}`).emit("pod:match:found", {
        requestId,
        pod: {
            id: matchedPod.uuid,
            name: matchedPod.name,
            category: matchedPod.category,
        },
    });
}, { connection: Redis_Client_Workers });
//# sourceMappingURL=matchmaking.worker.js.map