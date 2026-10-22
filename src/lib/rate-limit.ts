import "server-only";

const hits = new Map<string, number[]>();

/** In-memory sliding window; enough for a single app instance behind the VPS proxy. */
export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((time) => now - time >= windowMs)) hits.delete(k);
  }
  return false;
}
