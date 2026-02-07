import type { Socket } from "socket.io";
export interface AuthenticatedUser {
    id: string;
    email?: string;
    username?: string;
    role?: "user" | "admin" | "superuser";
}
export type AuthedSocket = Socket & {
    data: {
        user: AuthenticatedUser;
    };
    user?: AuthenticatedUser;
};
//# sourceMappingURL=authsocket.type.d.ts.map