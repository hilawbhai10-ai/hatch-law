import { PodRepo } from "../../Repository/pods.repository.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const createMessageService = async (payload) => {
    const { podId, channelId, content, senderId } = payload;
    if (!podId)
        throw { code: Status_Codes.BAD_REQUEST, message: "Pod id missing" };
    if (!content || typeof content !== "string")
        throw { code: Status_Codes.BAD_REQUEST, message: "Message content missing" };
    const result = await PodRepo.Create_Message(podId, channelId ?? null, senderId, content);
    if (!result.IsSucces)
        throw { code: Status_Codes.INTERNAL_SERVER_ERROR, message: "Failed to create message" };
    return result.Obj;
};
//# sourceMappingURL=createMessage.service.js.map