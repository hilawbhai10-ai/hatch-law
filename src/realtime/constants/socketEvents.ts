export const SOCKET_EVENTS = {
  // global
  SYSTEM_READY: "system:ready",

  // pods
  POD_CONNECT: "pod:connect",
  POD_CONNECTED: "pod:connected",
  POD_MEMBER_JOINED: "pod:member:joined",
  POD_MEMBER_LEFT: "pod:member:left",

  // matchmaking
  POD_MATCHMAKING_START: "pod:matchmaking:start",
  POD_MATCHMAKING_QUEUED: "pod:matchmaking:queued",
  POD_MATCH_FOUND: "pod:matchmaking:found",
  POD_MATCH_FAILED: "pod:matchmaking:failed",
  
  // channels
  CHANNEL_JOIN: "channel:join",
  CHANNEL_JOINED: "channel:joined",

  // chat
  MESSAGE_SEND: "message:send",
  MESSAGE_NEW: "message:new",

  // presence
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
} as const

export default SOCKET_EVENTS
