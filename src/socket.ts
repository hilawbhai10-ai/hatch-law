import { Server } from "socket.io"

export const createSocketServer = (httpServer: any) => {
  return new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true
    }
  })
}
