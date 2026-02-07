import type { JwtPayload } from "jsonwebtoken";
export default interface ExtendedSocket extends WebSocket {
    Session: JwtPayload;
    StartTime: number;
    RequestId: string;
}
//# sourceMappingURL=Extended_Types.d.ts.map