import { Worker } from "bullmq";
import Redis_Client_Workers from "../config/Redis_instances.js";
import logger from "../lib/logger.js";
const redisOptions = {
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null, // REQUIRED
    enableReadyCheck: true
};
export const PodsFinder = new Worker("PodsFinder", async (job) => {
    // Lostless write the logic here
    console.log("job recived");
    console.log(job);
    return {
        PodID: 123456789,
        Isnew: true
    };
}, {
    connection: redisOptions,
    concurrency: 5 // please set this according to the compute power it consumers 
});
//# sourceMappingURL=PodsFinders.js.map