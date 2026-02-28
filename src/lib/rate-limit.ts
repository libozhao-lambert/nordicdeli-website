/**
 * KV-based rate limiting.
 * Works on free Workers plan — no paid rate limiting primitives needed.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number; // Unix timestamp ms
}

/**
 * Checks and increments a rate limit counter stored in KV.
 *
 * @param kv - The KV namespace (RESERVATIONS_KV or SETTINGS_KV)
 * @param key - The KV key, e.g. "rl:ip:abc123"
 * @param limit - Maximum number of requests allowed within the window
 * @param ttlSeconds - Window size in seconds
 * @returns { success: true } if allowed, { success: false, retryAfter } if rate limited
 */
export async function checkRateLimit(
  kv: KVNamespace,
  key: string,
  limit: number,
  ttlSeconds: number
): Promise<{ success: boolean; retryAfter?: number }> {
  const now = Date.now();

  const raw = await kv.get(key, "text");
  let record: RateLimitRecord;

  if (raw) {
    try {
      record = JSON.parse(raw) as RateLimitRecord;
    } catch {
      record = { count: 0, resetAt: now + ttlSeconds * 1000 };
    }

    // If the window has expired, reset the counter
    if (now > record.resetAt) {
      record = { count: 0, resetAt: now + ttlSeconds * 1000 };
    }
  } else {
    record = { count: 0, resetAt: now + ttlSeconds * 1000 };
  }

  record.count += 1;

  // Write updated record back with TTL
  await kv.put(key, JSON.stringify(record), { expirationTtl: ttlSeconds });

  if (record.count > limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { success: false, retryAfter };
  }

  return { success: true };
}
