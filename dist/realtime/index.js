import { createSocketServer } from "../socket.js";
import { socketAuth } from "./middlewares/socketauth.middleware.js";
import { podsGateway } from "./gateway/pods.gateway.js";
import { chatGateway } from "./gateway/chat.gateway.js";
import { presenceGateway } from "./gateway/presence.gateway.js";
export let io = null;
export const initRealtime = (server) => {
    io = createSocketServer(server);
    io.use(socketAuth);
    io.on("connection", (socket) => {
        const authed = socket;
        authed.emit("system:ready", {
            userId: authed.user.id,
        });
        podsGateway(authed);
        chatGateway(authed);
        presenceGateway(authed);
    });
    return io;
};
//# sourceMappingURL=index.js.map