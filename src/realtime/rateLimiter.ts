const buckets = new Map<string, number[]>()

export const rateLimit = (
  key: string,
  limit = 10,
  windowMs = 5000
) => {
  const now = Date.now()

  const events = buckets.get(key) || []

  const filtered = events.filter((t) => now - t < windowMs)

  if (filtered.length >= limit) return false

  filtered.push(now)
  buckets.set(key, filtered)

  return true
}
