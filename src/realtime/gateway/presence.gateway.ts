import type { AuthedSocket } from "../type/socket.js"
import SOCKET_EVENTS from "../constants/socketEvents.js"

export const presenceGateway = (socket: AuthedSocket) => {

  socket.on(SOCKET_EVENTS.TYPING_START, ({ channelId }) => {

    if (!socket.context.joinedChannels.has(channelId)) return

    socket.to(`channel:${channelId}`).emit(
      SOCKET_EVENTS.TYPING_START,
      { userId: socket.user.id }
    )
  })


  socket.on(SOCKET_EVENTS.TYPING_STOP, ({ channelId }) => {

    if (!socket.context.joinedChannels.has(channelId)) return

    socket.to(`channel:${channelId}`).emit(
      SOCKET_EVENTS.TYPING_STOP,
      { userId: socket.user.id }
    )
  })
}
