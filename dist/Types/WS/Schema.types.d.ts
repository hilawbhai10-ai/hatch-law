export declare enum Events {
    Pods_Joining = "Pods_Joining"
}
export interface WsSendingObject {
    type: "response" | "error" | "event";
    event: Events;
    requestId: string | null;
    success: boolean;
    data?: unknown;
    error?: {
        message: string | object;
    };
}
export interface WsRecivingObject {
    type: "event";
    event: Events;
    requestId: string;
    payload: object;
}
//# sourceMappingURL=Schema.types.d.ts.map