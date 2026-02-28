/**
 * Computes available reservation slots for a given date.
 */

interface OpeningHours {
  open: string; // "06:30"
  close: string; // "14:30"
  lastSlot: string; // "13:00" — last slot that can be booked
}

const DEFAULT_HOURS: OpeningHours = {
  open: "06:30",
  close: "14:30",
  lastSlot: "13:00",
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/**
 * Computes available 30-minute slots for a given date.
 *
 * @param date - YYYY-MM-DD string
 * @param env - Cloudflare environment with RESERVATIONS_KV and SETTINGS_KV
 * @returns Array of available time strings like ["06:30", "07:00", ...]
 */
export async function computeAvailableSlots(
  date: string,
  env: { RESERVATIONS_KV: KVNamespace; SETTINGS_KV: KVNamespace }
): Promise<string[]> {
  // Reject past dates
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  if (date <= todayStr) {
    return [];
  }

  // Check for closed dates
  const closedRaw = await env.SETTINGS_KV.get("closedDates", "text");
  if (closedRaw) {
    try {
      const closedDates = JSON.parse(closedRaw) as string[];
      if (closedDates.includes(date)) return [];
    } catch {
      // ignore parse errors
    }
  }

  // Read opening hours from SETTINGS_KV
  let hours = DEFAULT_HOURS;
  const hoursRaw = await env.SETTINGS_KV.get("openingHours", "text");
  if (hoursRaw) {
    try {
      hours = JSON.parse(hoursRaw) as OpeningHours;
    } catch {
      // fall back to defaults
    }
  }

  const openMin = timeToMinutes(hours.open);
  const lastSlotMin = timeToMinutes(hours.lastSlot);

  // Generate all 30-min slots from open to lastSlot (inclusive)
  const allSlots: string[] = [];
  for (let m = openMin; m <= lastSlotMin; m += 30) {
    allSlots.push(minutesToTime(m));
  }

  // Check availability for each slot (max 1 concurrent booking per slot)
  const available: string[] = [];

  for (const slot of allSlots) {
    const key = `slot:${date}:${slot}`;
    const raw = await env.RESERVATIONS_KV.get(key, "text");
    if (!raw) {
      available.push(slot);
      continue;
    }
    try {
      const ids = JSON.parse(raw) as string[];
      // Only allow 1 booking per slot
      if (ids.length === 0) {
        available.push(slot);
      }
    } catch {
      available.push(slot);
    }
  }

  return available;
}
