/**
 * HMAC utilities for generating and verifying cancellation tokens.
 * Uses Web Crypto API for edge/Workers compatibility.
 */

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
  const buffer = new ArrayBuffer(hex.length / 2);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/**
 * Creates a cancellation token in the format `{reservationId}:{hexSignature}`.
 */
export async function createCancellationToken(
  reservationId: string,
  secret: string
): Promise<string> {
  const key = await getHmacKey(secret);
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(reservationId)
  );
  return `${reservationId}:${toHex(signature)}`;
}

/**
 * Verifies a cancellation token. Returns the reservationId if valid, null otherwise.
 */
export async function verifyCancellationToken(
  token: string,
  secret: string
): Promise<string | null> {
  try {
    const colonIndex = token.indexOf(":");
    if (colonIndex === -1) return null;

    const reservationId = token.slice(0, colonIndex);
    const hexSignature = token.slice(colonIndex + 1);

    if (!reservationId || !hexSignature) return null;

    const key = await getHmacKey(secret);
    const encoder = new TextEncoder();
    const expectedSig = fromHex(hexSignature);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      expectedSig,
      encoder.encode(reservationId)
    );

    return isValid ? reservationId : null;
  } catch {
    return null;
  }
}
