import { Queue } from "bullmq";
import Redis_Client_Workers from "../config/Redis_Instances_Workers.js";

export const MATCHMAKING_JOB_NAME = "MATCHMAKING_JOB";

export const MatchmakingQueue = new Queue(MATCHMAKING_JOB_NAME, {
  connection: Redis_Client_Workers,
});
