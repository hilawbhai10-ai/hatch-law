import { createSocketServer } from "../socket.js"
import { socketAuth } from "./middlewares/socketauth.middleware.js"
import type { AuthedSocket } from "./type/socket.js"

import { podsGateway } from "./gateway/pods.gateway.js"
import { chatGateway } from "./gateway/chat.gateway.js"
import { presenceGateway } from "./gateway/presence.gateway.js"
import type { Server } from "socket.io"
import SOCKET_EVENTS from "./constants/socketEvents.js"


let io : Server


export const getIO = () => {
  if (!io) throw new Error("IO not initialized")
  return io
}


export const initRealtime = (server: any) => {
  io = createSocketServer(server)

  io.use(socketAuth)


  io.on("connection", (socket) => {

  const authedSocket = socket as AuthedSocket

  authedSocket.emit(SOCKET_EVENTS.SYSTEM_READY, {
    userId: authedSocket.user.id,
  })

  podsGateway(authedSocket)
  chatGateway(authedSocket)
  presenceGateway(authedSocket)
})


  return io
}
