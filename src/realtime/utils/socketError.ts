import type{ AuthedSocket } from "../type/socket.js"

export const emitSocketError = (
  socket: AuthedSocket,
  code: string,
  message: string
) => {

  socket.emit("socket:error", {
    code,
    message,
    timestamp: Date.now(),
  })

}
