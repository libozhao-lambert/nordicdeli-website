import https from "https";
import type { EventData } from "@/types/event";

const EB_ORG_ID = "2993744542028";
const EB_URL =
  `https://www.eventbriteapi.com/v3/organizations/${EB_ORG_ID}/events/` +
  `?expand=ticket_availability,venue&status=live,completed,started,ended`;

// Minimal subset of the Eventbrite event shape we need
interface EBEvent {
  id: string;
  name: { text: string };
  summary: string;
  description: { text: string };
  start: { local: string }; // "2026-06-20T18:00:00"
  end: { local: string };
  url: string;
  status: string; // "live" | "draft" | "completed" | "canceled" | "started" | "ended"
  capacity?: number;
  is_online_event: boolean;
  venue?: {
    address?: { localized_address_display?: string };
  };
  ticket_availability?: {
    is_sold_out: boolean;
    minimum_ticket_price?: { major_value: string };
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapStatus(ebStatus: string, isSoldOut: boolean): EventData["status"] {
  if (ebStatus === "canceled") return "cancelled";
  if (ebStatus === "completed" || ebStatus === "ended") return "past";
  if (isSoldOut) return "sold-out";
  return "available";
}

function mapEvent(e: EBEvent): EventData {
  const date = e.start.local.slice(0, 10);
  const time = e.start.local.slice(11, 16);
  const endTime = e.end.local.slice(11, 16);
  const isSoldOut = e.ticket_availability?.is_sold_out ?? false;
  const priceRaw = e.ticket_availability?.minimum_ticket_price?.major_value;
  const price = priceRaw ? parseFloat(priceRaw) : undefined;
  const location = e.is_online_event
    ? "Online Event"
    : (e.venue?.address?.localized_address_display ??
        "The Nordic Deli, Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212");

  return {
    title: e.name.text,
    slug: slugify(e.name.text),
    date,
    time,
    endTime,
    location,
    description: e.summary ?? e.name.text,
    content: e.description?.text ?? "",
    price,
    seats: e.capacity,
    status: mapStatus(e.status, isSoldOut),
    eventbriteUrl: e.url,
  };
}

/**
 * Use Node's https module directly — bypasses Next.js's fetch() interceptor
 * which silently drops caching for any request with an Authorization header.
 * Module-level cache means one API call per build process.
 */
function httpsGet(url: string, token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

// Module-level cache — shared across all page renders in the same build
let _cache: EventData[] | null = null;

/**
 * Fetches published events from Eventbrite at build time.
 * Returns an empty array if the token is not set or the request fails.
 */
export async function fetchEventbriteEvents(): Promise<EventData[]> {
  if (_cache !== null) return _cache;

  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
  if (!token) {
    console.log("[Eventbrite] EVENTBRITE_PRIVATE_TOKEN not set — skipping");
    _cache = [];
    return _cache;
  }

  try {
    const body = await httpsGet(EB_URL, token);
    const data = JSON.parse(body) as { events?: EBEvent[]; error?: string };

    if (data.error) {
      console.warn(`[Eventbrite] API error: ${data.error}`);
      _cache = [];
      return _cache;
    }

    _cache = (data.events ?? []).map(mapEvent);
    console.log(`[Eventbrite] Fetched ${_cache.length} event(s)`);
    return _cache;
  } catch (err) {
    console.warn("[Eventbrite] Request failed:", err);
    _cache = [];
    return _cache;
  }
}
