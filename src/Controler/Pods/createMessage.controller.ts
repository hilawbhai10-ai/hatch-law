import type { Request, Response } from "express";
import { createMessageService } from "../../Service/pods/createMessage.service.js";

export const CreateMessageController = async (req: Request, res: Response) => {
  try {
    const podId = req.params.podId as string;
    const channelId = req.body.channelId as string | undefined;
    const content = req.body.content as string;

    const senderId = (req as any).user?.id as string | undefined;

    if (!content) return res.status(400).json({ success: false, message: "Message content is required" });
    if (!senderId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const message = await createMessageService({ podId, channelId, content, senderId });

    return res.status(200).json({ success: true, message });
  } catch (err: any) {
    return res.status(err.code || 500).json({ success: false, message: err.message || "Internal" });
  }
};