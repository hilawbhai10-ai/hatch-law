import { io } from "../../realtime/index.js"
import type { Request } from "express";
import { PodRepo } from "../../Repository/pods.repository.js";

export const confirmJoinService = async (req: Request) => {
  const userId = req.user?.id
  const { podId } = req.body

  // 1️⃣ Capacity / state check (authoritative)
  const canJoin = await PodRepo.Can_Join(podId)
  if (!canJoin.CanJoin) {
    throw new Error("Pod full or unavailable")
  }

  // 2️⃣ DB mutation (SOURCE OF TRUTH)
  const result = await PodRepo.Add_Member(podId, userId || "", "member")
  if (!result.IsSucces) {
    throw new Error("Failed to join pod")
  }

  // 3️⃣ Realtime sync (AFTER DB SUCCESS)

  // notify existing pod members
  io?.to(`pod:${podId}`).emit("pod:member:joined", {
    userId,
  })

  // notify the user
  io?.to(`user:${userId}`).emit("pod:joined", {
    podId,
  })

  // 🔥 AUTO CHANNEL JOIN (THIS IS THE LINE YOU ASKED ABOUT)
  io?.to(`user:${userId}`).emit("channels:auto-join", {
    podId,
    channels: ["general", "resources", "whiteboard", "activitylog"],
  })

  return { success: true }
}
