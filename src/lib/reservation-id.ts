/**
 * Generates a reservation ID in the format R-XXXXX.
 * Uses crypto.getRandomValues for compatibility with edge/Workers runtime.
 * Excludes ambiguous characters: 0, O, 1, I.
 */

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ID_LENGTH = 5;

export function generateReservationId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  let result = "R-";
  for (let i = 0; i < ID_LENGTH; i++) {
    result += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return result;
}
