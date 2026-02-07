import crypto from "crypto";
import { Pods_Zoining_Schema } from "../../Utils/Zod_Validation.js";
import { CloseSockets } from "../../Utils/Utils_func.js";
import WS_Status_codes from "../../Constant/WS_Status_codes.js";
export const PodsControlers = (socket, Payload) => {
    socket.StartTime = Date.now();
    socket.RequestId = crypto.randomUUID();
    const IsSchemaValid = Pods_Zoining_Schema.safeParse(Payload);
    if (!IsSchemaValid.success)
        return CloseSockets(socket, IsSchemaValid.error.flatten(), WS_Status_codes.POLICY_VIOLATION, "Invalid Schema");
    try {
        // Service Layer logic 
    }
    catch (e) {
        // Error handler
    }
    // at last Loggers 
};
//# sourceMappingURL=Controler.Pods.js.map