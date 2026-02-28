/**
 * IP extraction and hashing utilities.
 * Uses Web Crypto API for edge/Workers compatibility.
 */

/**
 * Extracts the client IP address from request headers.
 * Reads cf-connecting-ip first (set by Cloudflare), then falls back to x-forwarded-for.
 */
export function extractIP(request: Request): string {
  const cfIP = request.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for may be a comma-separated list; take the first IP
    return forwarded.split(",")[0].trim();
  }

  return "unknown";
}

/**
 * Hashes an IP address using HMAC-SHA-256 with the provided secret.
 * Returns a hex string suitable for use as a KV key.
 */
export async function hashIP(ip: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const ipData = encoder.encode(ip);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, ipData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
