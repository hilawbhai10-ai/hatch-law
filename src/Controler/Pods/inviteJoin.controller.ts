import type { Request, Response } from "express";
import { joinPodViaInviteService } from "../../Service/pods/joinPodInvite.service.js";

export const inviteJoinController = async (req: Request, res: Response) => {
  try {

    // service to handle joining via invite link, checks invite validity, pod status, etc.
    const { inviteToken } = req.body

     const result = await joinPodViaInviteService(
    req.user!.id,
    inviteToken
    )

    return res.status(200).json({ success: true, message: "Joined pod via invite successfully" });
  } catch (err: any) {
    const code = err.code || err.statusCode || 500;
    return res.status(code).json({
      success: false,
      message: err.message || "Internal",
      code,
    });
  }
};