import type { Socket } from "socket.io";
export declare function generate4DigitNumber(): number;
export declare function generate9DigitNumber(): number;
export declare const SendSocketMessage: (socket: Socket, event: string, payload: object) => void;
export declare const SafeJoin: (socket: Socket, room: string) => void;
//# sourceMappingURL=Utils_func.d.ts.map