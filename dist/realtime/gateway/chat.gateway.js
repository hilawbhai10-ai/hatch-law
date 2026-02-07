import { SOCKET_EVENTS } from "../constants/socketEvents.js";
import { createMessageService } from "../../Service/pods/createMessage.service.js";
export const chatGateway = (socket) => {
    socket.on(SOCKET_EVENTS.CHANNEL_JOIN, ({ podId, channelId }) => {
        socket.join(`channel:${channelId}`);
        socket.context.joinedChannels ??= new Set();
        socket.context.joinedChannels.add(channelId);
        socket.emit(SOCKET_EVENTS.CHANNEL_JOINED, { channelId });
    });
    socket.on(SOCKET_EVENTS.MESSAGE_SEND, async (payload) => {
        // persist message via service (reusable for HTTP and sockets)
        try {
            await createMessageService({ podId: payload.podId, channelId: payload.channelId, content: payload.content ?? "", senderId: payload.userId ?? socket.user.id });
        }
        catch (err) {
            console.error('Failed to persist message', err);
        }
        socket.to(`channel:${payload.channelId}`).emit(SOCKET_EVENTS.MESSAGE_NEW, payload);
    });
};
//# sourceMappingURL=chat.gateway.js.map