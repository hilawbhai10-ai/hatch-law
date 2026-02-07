import { z } from "zod"

export const ChannelJoinSchema = z.object({
  podId: z.string(),
  channelId: z.string(),
})

export const MessageSendSchema = z.object({
  podId: z.string(),
  channelId: z.string(),
  content: z.string().min(1).max(2000),
})
