import jwt from "jsonwebtoken"
import { Socket } from "socket.io"
import type { AuthedSocket } from "../type/socket.js"

export const socketAuth = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error("Unauthorized"))

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any

    const authed = socket as AuthedSocket

    authed.user = {
      id: decoded.id,
      username: decoded.username,
    }

    authed.context = {
      joinedPods: new Set(),
      joinedChannels: new Set(),
    }

    socket.join(`user:${decoded.id}`)

    next()
  } catch (err) {
    console.error(err)
    next(new Error("Unauthorized"))
  }
}
