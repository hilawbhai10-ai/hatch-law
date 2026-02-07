import { Server } from "socket.io";
export const createSocketServer = (httpServer) => {
    return new Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true
        }
    });
};
//# sourceMappingURL=socket.js.map