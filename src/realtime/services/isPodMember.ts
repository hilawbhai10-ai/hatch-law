import { PodRepo } from "../../Repository/pods.repository.js"

export const isPodMember = async (
  userId: string,
  podId: string
): Promise<boolean> => {

  const result = await PodRepo.Get_Membership(podId, userId)

  return !!result
}
