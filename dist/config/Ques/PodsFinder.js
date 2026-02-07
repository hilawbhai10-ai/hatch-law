import { Queue } from "bullmq";
import Redis_Client_Workers from "../Redis_instances.js";
export const Pods = new Queue("PodsFinder", {
    connection: Redis_Client_Workers,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 1500,
        },
        removeOnComplete: true,
        removeOnFail: {
            age: 86400, // 1 day 
            limit: 1000
        }
    }
});
//# sourceMappingURL=PodsFinder.js.map