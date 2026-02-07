import type { Socket } from "socket.io"

/**
 * Minimal user payload kept on socket
 * NEVER put full user object here
 */
export interface SocketUser {
  id: string
  username: string
}

/**
 * Runtime socket context
 */
export interface SocketContext {
  joinedPods: Set<string>
  joinedChannels: Set<string>
}

/**
 * Authenticated Socket
 * Intersection type instead of inheritance
 */
export type AuthedSocket = Socket & {
  user: SocketUser
  context: SocketContext
}
