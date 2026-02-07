export const presenceGateway = (socket) => {
    socket.on("typing:start", ({ channelId }) => {
        socket.to(`channel:${channelId}`).emit("typing:update", {
            userId: socket.user.id,
            typing: true,
        });
    });
    socket.on("typing:stop", ({ channelId }) => {
        socket.to(`channel:${channelId}`).emit("typing:update", {
            userId: socket.user.id,
            typing: false,
        });
    });
};
//# sourceMappingURL=presence.gateway.js.map