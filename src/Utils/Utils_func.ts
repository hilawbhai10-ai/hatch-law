import type { Socket } from "socket.io";
import logger from "../lib/logger.js";
import type { LogSchema } from "../types/logger.types.js";
import { AppError2 } from "../Constant/Error_Class2.js";
import InternalServerCode from "../Constant/Internal_Service_Code.js";

export function generate4DigitNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export function generate9DigitNumber(): number {
  return Math.floor(100000000 + Math.random() * 900000000);
}

export const SendSocketMessage = (socket: Socket, event: string, payload: object) => {
  try {
    socket.emit(event, payload);
  } catch (err: any) {
    logger.error('Failed to send socket message', { err });
    throw new AppError2(
      "User Error",
      InternalServerCode.UserError,
      "Socket-Service",
      "User",
      err?.message ?? String(err),
      "Unable to send Socket.IO message"
    );
  }
};

// Helper to safely join a socket to a room
export const SafeJoin = (socket: Socket, room: string) => {
  try {
    socket.join(room);
  } catch (err) {
    logger.error('SafeJoin failed', { room, err });
  }
};



