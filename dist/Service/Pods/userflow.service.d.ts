import Status_Codes from "../../Constant/Status_Codes.js";
interface Obj {
    Id: number;
    isPublic: boolean;
    Name?: string;
    Url?: string;
}
export declare const PodsJoiningService: (obj: Obj) => Promise<{
    Status_Codes: Status_Codes;
    Reason: string;
} | undefined>;
export {};
//# sourceMappingURL=userflow.service.d.ts.map