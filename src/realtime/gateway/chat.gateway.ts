import type { AuthedSocket } from "../type/socket.js"
import SOCKET_EVENTS from "../constants/socketEvents.js"

import { ChannelJoinSchema, MessageSendSchema } from "../middlewares/validation/chat.schema.js"

import { emitSocketError } from "../utils/socketError.js"
import { rateLimit } from "../rateLimiter.js"

import { createMessageService } from "../../Service/pods/createMessage.service.js"

export const chatGateway = (socket: AuthedSocket) => {

  /* ---------- CHANNEL JOIN ---------- */

  socket.on(SOCKET_EVENTS.CHANNEL_JOIN, (payload) => {

    const parsed = ChannelJoinSchema.safeParse(payload)

    if (!parsed.success)
      return emitSocketError(socket, "VALIDATION_ERROR", "Invalid payload")

    const { podId, channelId } = parsed.data

    if (!socket.context.joinedPods.has(podId))
      return emitSocketError(socket, "FORBIDDEN", "Join pod first")

    socket.join(`channel:${channelId}`)
    socket.context.joinedChannels.add(channelId)

    socket.emit(SOCKET_EVENTS.CHANNEL_JOINED, { channelId })
  })


  /* ---------- MESSAGE SEND ---------- */

  socket.on(SOCKET_EVENTS.MESSAGE_SEND, async (payload) => {

    if (!rateLimit(socket.user.id + ":msg", 20))
      return emitSocketError(socket, "RATE_LIMIT", "Too many messages")

    const parsed = MessageSendSchema.safeParse(payload)

    if (!parsed.success)
      return emitSocketError(socket, "VALIDATION_ERROR", "Invalid payload")

    const { podId, channelId, content } = parsed.data

    if (!socket.context.joinedChannels.has(channelId))
      return emitSocketError(socket, "FORBIDDEN", "Join channel first")

    try {

      const message = await createMessageService({
        podId,
        channelId,
        content,
        senderId: socket.user.id,
      })

      socket.to(`channel:${channelId}`).emit(
        SOCKET_EVENTS.MESSAGE_NEW,
        message
      )

    } catch (err) {
      console.error(err)

      emitSocketError(
        socket,
        SOCKET_EVENTS.MESSAGE_SEND,
        "Failed to send message"
      )
    }
  })
}
