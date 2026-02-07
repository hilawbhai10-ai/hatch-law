import { z } from "zod"

export const PodConnectSchema = z.object({
  podId: z.string().min(1),
})

export const MatchmakingSchema = z.object({
  excludedPodIds: z.array(z.string()).optional(),
  criteria: z.record(z.string(), z.any()).optional(),
})
