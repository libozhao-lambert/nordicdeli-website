import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Reservation } from "@/types/reservation";

const SLOT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

/**
 * Saves a reservation to KV and updates the slot index.
 */
export async function saveReservation(reservation: Reservation): Promise<void> {
  const { env } = getCloudflareContext();
  const kv = env.RESERVATIONS_KV;

  // Write the main reservation record
  await kv.put(`reservation:${reservation.id}`, JSON.stringify(reservation));

  // Extract date and time from startAt (ISO 8601 with +10:00 offset)
  // startAt format: "2026-06-20T18:00:00+10:00"
  const dateTimePart = reservation.startAt.slice(0, 16); // "2026-06-20T18:00"
  const [datePart, timePart] = dateTimePart.split("T");
  const slotKey = `slot:${datePart}:${timePart}`;

  // Read existing slot index and append
  const existing = await kv.get(slotKey, "text");
  let ids: string[] = [];
  if (existing) {
    try {
      ids = JSON.parse(existing) as string[];
    } catch {
      ids = [];
    }
  }

  if (!ids.includes(reservation.id)) {
    ids.push(reservation.id);
  }

  await kv.put(slotKey, JSON.stringify(ids), {
    expirationTtl: SLOT_TTL_SECONDS,
  });
}

/**
 * Retrieves a reservation by ID.
 */
export async function getReservation(id: string): Promise<Reservation | null> {
  const { env } = getCloudflareContext();
  const kv = env.RESERVATIONS_KV;

  const raw = await kv.get(`reservation:${id}`, "text");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Reservation;
  } catch {
    return null;
  }
}

/**
 * Cancels a reservation by updating its status to "cancelled".
 * Returns the updated reservation, or null if not found.
 */
export async function cancelReservation(
  id: string
): Promise<Reservation | null> {
  const { env } = getCloudflareContext();
  const kv = env.RESERVATIONS_KV;

  const raw = await kv.get(`reservation:${id}`, "text");
  if (!raw) return null;

  let reservation: Reservation;
  try {
    reservation = JSON.parse(raw) as Reservation;
  } catch {
    return null;
  }

  reservation.status = "cancelled";
  await kv.put(`reservation:${id}`, JSON.stringify(reservation));

  return reservation;
}
