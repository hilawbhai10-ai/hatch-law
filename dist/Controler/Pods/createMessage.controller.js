import { createMessageService } from "../../Service/pods/createMessage.service.js";
export const CreateMessageController = async (req, res) => {
    try {
        const podId = req.params.podId;
        const channelId = req.body.channelId;
        const content = req.body.content;
        const senderId = req.user?.id;
        if (!content)
            return res.status(400).json({ success: false, message: "Message content is required" });
        if (!senderId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        const message = await createMessageService({ podId, channelId, content, senderId });
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        return res.status(err.code || 500).json({ success: false, message: err.message || "Internal" });
    }
};
//# sourceMappingURL=createMessage.controller.js.map