import { PodRepo } from "../../Repository/pods.repository.js";

export const joinPodService = async (
  userId: string,
  podId: string
): Promise<{
  success: boolean
  alreadyMember?: boolean
}> => {

  /* ---------- add membership ---------- */
  const result = await PodRepo.Add_Member(podId, userId, "member")

  if (!result.IsSucces) {

    // Unique violation → user already member → idempotent success
    if (result.Error_Code === "P2002") {
      return {
        success: true,
        alreadyMember: true
      }
    }

    throw new Error("MEMBERSHIP_CREATE_FAILED")
  }

  return { success: true }
}
