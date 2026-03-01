import type { EventData } from "@/types/event";

const EB_BASE = "https://www.eventbriteapi.com/v3";
const EB_ORG_ID = "2993744542028";

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

function mapStatus(
  ebStatus: string,
  isSoldOut: boolean
): EventData["status"] {
  if (ebStatus === "canceled") return "cancelled";
  if (ebStatus === "completed" || ebStatus === "ended") return "past";
  if (isSoldOut) return "sold-out";
  return "available";
}

/**
 * Fetches published events from Eventbrite at build time.
 * Returns an empty array if the token is not set or the request fails.
 */
export async function fetchEventbriteEvents(): Promise<EventData[]> {
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
  if (!token) return [];

  let res: Response;
  try {
    res = await fetch(
      `${EB_BASE}/organizations/${EB_ORG_ID}/events/` +
        `?expand=ticket_availability,venue&status=live,completed,started,ended`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
  } catch (err) {
    console.warn("[Eventbrite] fetch failed:", err);
    return [];
  }

  if (!res.ok) {
    console.warn(`[Eventbrite] API error ${res.status}: ${await res.text()}`);
    return [];
  }

  const data = (await res.json()) as { events?: EBEvent[] };

  return (data.events ?? []).map((e): EventData => {
    const date = e.start.local.slice(0, 10); // YYYY-MM-DD
    const time = e.start.local.slice(11, 16); // HH:mm
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
  });
}
