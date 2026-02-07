import { PodRepo } from "../../Repository/pods.repository.js";
import { joinUserToPodSockets } from "../../Controler/hybridSocket/socketPodJoiner.js";

export const joinPodViaInviteService = async (
  userId: string,
  inviteToken: string
) => {

  const invite = await PodRepo.GetInviteByToken(inviteToken)

  if (!invite || !invite.expiresAt || invite.expiresAt < new Date()) {
    throw { code: 400, message: "Invalid invite" }
  }

  await PodRepo.Add_Member(invite.podId, userId, "member")

  joinUserToPodSockets(userId, invite.podId)

  return { success: true }
}
