import type { Request } from "express";
export default interface AppRequest extends Request {
    RequestId?: string;
    hasError?: boolean;
}
//# sourceMappingURL=Extend_Requests.d.ts.map