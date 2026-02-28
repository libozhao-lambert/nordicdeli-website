import { getCloudflareContext } from "@opennextjs/cloudflare";

interface OpeningHours {
  open: string; // "06:30"
  close: string; // "14:30"
  lastSlot: string; // "13:00"
}

const DEFAULT_OPENING_HOURS: OpeningHours = {
  open: "06:30",
  close: "14:30",
  lastSlot: "13:00",
};

/**
 * Gets opening hours from SETTINGS_KV.
 * Falls back to default hours if not configured.
 */
export async function getOpeningHours(): Promise<OpeningHours> {
  const { env } = getCloudflareContext();
  const kv = env.SETTINGS_KV;

  const raw = await kv.get("openingHours", "text");
  if (!raw) return DEFAULT_OPENING_HOURS;

  try {
    return JSON.parse(raw) as OpeningHours;
  } catch {
    return DEFAULT_OPENING_HOURS;
  }
}

/**
 * Gets the list of closed dates from SETTINGS_KV.
 * Returns an array of YYYY-MM-DD strings.
 */
export async function getClosedDates(): Promise<string[]> {
  const { env } = getCloudflareContext();
  const kv = env.SETTINGS_KV;

  const raw = await kv.get("closedDates", "text");
  if (!raw) return [];

  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}
