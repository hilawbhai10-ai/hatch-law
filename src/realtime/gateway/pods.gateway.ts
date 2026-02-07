import type { AuthedSocket } from "../type/socket.js"
import SOCKET_EVENTS from "../constants/socketEvents.js"
import { PodConnectSchema } from "../middlewares/validation/pod.schema.js"
import { emitSocketError } from "../utils/socketError.js"
import { rateLimit } from "../rateLimiter.js"

import { isPodMember } from "../services/isPodMember.js"
import { PodRepo } from "../../Repository/pods.repository.js"
import { joinPodService } from "../services/joinPodService.js"


export const podsGateway = (socket: AuthedSocket) => {

  socket.on(SOCKET_EVENTS.POD_CONNECT, async (payload) => {

    const parsed = PodConnectSchema.safeParse(payload)

    if (!parsed.success)
      return emitSocketError(socket, "VALIDATION_ERROR", "Invalid payload")

    const { podId } = parsed.data

    if (!rateLimit(socket.user.id + ":" + podId))
      return emitSocketError(socket, "RATE_LIMIT", "Too many requests")

    /* ---------- avoid duplicate joins ---------- */
    if (socket.context.joinedPods.has(podId)) {
      return
    }

    try {

      /* ---------- verify pod exists ---------- */
      const podExists = await PodRepo.Is_Pod_Exists(podId)

      if (!podExists)
        return emitSocketError(socket, "NOT_FOUND", "Pod not found")

      /* ---------- idempotent membership ---------- */
      await joinPodService(socket.user.id, podId)

      /* ---------- socket join ---------- */
      socket.join(`pod:${podId}`)
      socket.context.joinedPods.add(podId)

      socket.emit(SOCKET_EVENTS.POD_CONNECTED, { podId })

      socket.to(`pod:${podId}`).emit(
        SOCKET_EVENTS.POD_MEMBER_JOINED,
        { userId: socket.user.id }
      )

    } catch (err) {

      console.error("Pod join failed:", err)

      emitSocketError(socket, "POD_JOIN_FAILED", "Failed to join pod")
    }

  })

  socket.on("disconnect", () => {

    for (const podId of socket.context.joinedPods) {

      socket.to(`pod:${podId}`).emit(
        SOCKET_EVENTS.POD_MEMBER_LEFT,
        { userId: socket.user.id }
      )

    }

  })
}
