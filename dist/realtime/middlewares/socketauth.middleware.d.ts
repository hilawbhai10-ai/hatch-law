import type { Socket } from "socket.io";
export declare const verifyToken: (token: string) => Promise<{
    id: string;
    username: string;
}>;
export declare const socketAuth: (socket: Socket, next: (err?: Error) => void) => Promise<void>;
//# sourceMappingURL=socketauth.middleware.d.ts.map