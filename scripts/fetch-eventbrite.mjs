#!/usr/bin/env node
/**
 * Prebuild script: fetches live events from Eventbrite and writes the result
 * to src/data/events-cache.json, which is statically imported at build time.
 *
 * Eventbrite is the single source of truth for events.
 * Run automatically in CI before `opennextjs-cloudflare build`.
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "events-cache.json");

const EB_ORG_ID = "2993744542028";
const EB_URL =
  `https://www.eventbriteapi.com/v3/organizations/${EB_ORG_ID}/events/` +
  `?expand=ticket_availability,venue,logo&status=live,completed,started,ended`;

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapStatus(ebStatus, isSoldOut) {
  if (ebStatus === "canceled") return "cancelled";
  if (ebStatus === "completed" || ebStatus === "ended") return "past";
  if (isSoldOut) return "sold-out";
  return "available";
}

function mapEbEvent(e) {
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
    image: e.logo?.original?.url ?? e.logo?.url,
  };
}

function httpsGet(url, token) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function main() {
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;

  if (!token) {
    console.log("[prebuild] EVENTBRITE_PRIVATE_TOKEN not set — writing empty cache");
    fs.writeFileSync(OUT, "[]\n");
    return;
  }

  try {
    const body = await httpsGet(EB_URL, token);
    const data = JSON.parse(body);

    if (data.error) {
      console.warn(`[prebuild] Eventbrite API error: ${data.error}`);
      fs.writeFileSync(OUT, "[]\n");
      return;
    }

    const events = (data.events ?? [])
      .map(mapEbEvent)
      .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

    fs.writeFileSync(OUT, JSON.stringify(events, null, 2) + "\n");
    console.log(`[prebuild] Wrote ${events.length} event(s) to src/data/events-cache.json`);
  } catch (err) {
    console.warn("[prebuild] Eventbrite fetch failed:", err.message);
    fs.writeFileSync(OUT, "[]\n");
  }
}

main().catch((err) => {
  console.error("[prebuild] Fatal error:", err);
  process.exit(1);
});
