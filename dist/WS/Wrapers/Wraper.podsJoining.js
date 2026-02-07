import { SchemaValidators } from "../../Validators/Middleware/Websockets/Validators/Payload.validators.js";
import { Pods_Zoining_Schema } from "../../Utils/Zod_Validation.js";
import { WsLogger } from "../../Validators/Middleware/Websockets/logger/Normal_Logger.js";
import { JoiningPods } from "../Services/Service.podsJoining.js";
// Deprecated WS wrapper. Replaced by Socket.IO runtime gateways.
export const deprecatedPodsJoiningWrapper = () => {
    throw new Error('WS wrapper removed. Use Socket.IO realtime gateways (src/realtime).');
};
//# sourceMappingURL=Wraper.podsJoining.js.map