import { SOCKET_EVENTS } from "../constants/socketEvents.js";
import { MatchmakingQueue, MATCHMAKING_JOB_NAME, } from "../../Queues/matchmaking.queue.js";
export const podsGateway = (socket) => {
    /* --------------------------------------------------
       GLOBAL USER ROOM (required for workers)
    -------------------------------------------------- */
    socket.join(`user:${socket.user.id}`);
    /* --------------------------------------------------
       POD CONNECT (after HTTP join)
    -------------------------------------------------- */
    socket.on(SOCKET_EVENTS.POD_CONNECT, async ({ podId }) => {
        if (!podId)
            return;
        socket.join(`pod:${podId}`);
        socket.context.joinedPods.add(podId);
        socket.emit(SOCKET_EVENTS.POD_CONNECTED, { podId });
        socket.to(`pod:${podId}`).emit(SOCKET_EVENTS.POD_MEMBER_JOINED, { userId: socket.user.id });
    });
    /* --------------------------------------------------
       SOCKET MATCHMAKING
    -------------------------------------------------- */
    socket.on(SOCKET_EVENTS.POD_MATCHMAKING_START, async (payload) => {
        try {
            await MatchmakingQueue.add(MATCHMAKING_JOB_NAME, {
                userId: socket.user.id,
                socketId: socket.id,
                excludedPodIds: payload?.excludedPodIds ?? [],
                criteria: payload?.criteria ?? {},
            }, {
                removeOnComplete: true,
                removeOnFail: 50,
            });
            socket.emit(SOCKET_EVENTS.POD_MATCHMAKING_QUEUED);
        }
        catch (err) {
            console.error("Matchmaking queue error:", err);
            socket.emit(SOCKET_EVENTS.POD_MATCH_FAILED, {
                reason: "INTERNAL_ERROR",
            });
        }
    });
    /* --------------------------------------------------
       DISCONNECT CLEANUP
    -------------------------------------------------- */
    socket.on("disconnect", () => {
        for (const podId of socket.context.joinedPods) {
            socket.to(`pod:${podId}`).emit(SOCKET_EVENTS.POD_MEMBER_LEFT, { userId: socket.user.id });
        }
    });
};
//# sourceMappingURL=pods.gateway.js.map