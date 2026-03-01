#!/usr/bin/env node
/**
 * Prebuild script: reads local MDX event files + fetches live Eventbrite events,
 * merges them, and writes the result to src/data/events-cache.json.
 *
 * Run automatically in CI before `opennextjs-cloudflare build`.
 * Eventbrite events take priority; MDX events fill gaps.
 * Falls back to MDX-only when EVENTBRITE_PRIVATE_TOKEN is not set.
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "events-cache.json");
const EVENTS_DIR = path.join(ROOT, "src", "content", "events");

const EB_ORG_ID = "2993744542028";
const EB_URL =
  `https://www.eventbriteapi.com/v3/organizations/${EB_ORG_ID}/events/` +
  `?expand=ticket_availability,venue&status=live,completed,started,ended`;

// --- Eventbrite helpers ---

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

async function fetchEbEvents(token) {
  const body = await httpsGet(EB_URL, token);
  const data = JSON.parse(body);
  if (data.error) {
    console.warn(`[prebuild] Eventbrite API error: ${data.error}`);
    return [];
  }
  return (data.events ?? []).map(mapEbEvent);
}

// --- MDX frontmatter parser (no external deps) ---

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const content = match[2].trim();
  const data = {};

  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Coerce numbers
    if (value !== "" && !isNaN(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

function readMdxEvents() {
  if (!fs.existsSync(EVENTS_DIR)) return [];

  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(EVENTS_DIR, filename), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return { ...data, content };
    });
}

// --- Main ---

async function main() {
  const mdxEvents = readMdxEvents();
  console.log(`[prebuild] Read ${mdxEvents.length} MDX event(s)`);

  let ebEvents = [];
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;

  if (token) {
    try {
      ebEvents = await fetchEbEvents(token);
      console.log(`[prebuild] Fetched ${ebEvents.length} Eventbrite event(s)`);
    } catch (err) {
      console.warn("[prebuild] Eventbrite fetch failed:", err.message);
    }
  } else {
    console.log("[prebuild] EVENTBRITE_PRIVATE_TOKEN not set — using MDX only");
  }

  // Eventbrite takes priority; skip MDX events whose slug collides
  const ebSlugs = new Set(ebEvents.map((e) => e.slug));
  const filteredMdx = mdxEvents.filter((e) => !ebSlugs.has(e.slug));

  const all = [...ebEvents, ...filteredMdx].sort((a, b) =>
    a.date > b.date ? -1 : a.date < b.date ? 1 : 0
  );

  fs.writeFileSync(OUT, JSON.stringify(all, null, 2) + "\n");
  console.log(
    `[prebuild] Wrote ${all.length} event(s) to src/data/events-cache.json`
  );
}

main().catch((err) => {
  console.error("[prebuild] Fatal error:", err);
  process.exit(1);
});
