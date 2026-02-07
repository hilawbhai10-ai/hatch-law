export const verifyToken = async (token) => {
    try {
        const decoded = await import("jsonwebtoken").then(({ verify }) => verify(token, process.env.JWT_SECRET || "your-secret-key"));
        if (typeof decoded === "object" && decoded !== null) {
            return {
                id: decoded.id,
                username: decoded.username,
            };
        }
        throw new Error("Invalid token payload");
    }
    catch (error) {
        throw new Error("Token verification failed");
    }
};
export const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Unauthorized"));
        }
        // 🔐 verify token (JWT / session)
        const user = await verifyToken(token);
        socket.user = {
            id: user.id,
            username: user.username,
        };
        socket.context = {
            joinedPods: new Set(),
            joinedChannels: new Set(),
        };
        /**
         * GLOBAL USER SOCKET
         */
        socket.join(`user:${user.id}`);
        next();
    }
    catch {
        next(new Error("Unauthorized"));
    }
};
//# sourceMappingURL=socketauth.middleware.js.map