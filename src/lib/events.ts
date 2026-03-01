import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { EventData, EventFrontmatter } from "@/types/event";
import { fetchEventbriteEvents } from "./eventbrite";

const EVENTS_DIR = path.join(process.cwd(), "src", "content", "events");

function readMdxEvents(): EventData[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];

  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(EVENTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return { ...(data as EventFrontmatter), content: content.trim() };
    });
}

/**
 * Returns all events from Eventbrite (primary) merged with local MDX files
 * (fallback). Eventbrite events take priority — MDX events with a conflicting
 * slug are skipped. Sorted by date descending (newest first).
 */
export async function getAllEvents(): Promise<EventData[]> {
  const [ebEvents, mdxEvents] = await Promise.all([
    fetchEventbriteEvents(),
    Promise.resolve(readMdxEvents()),
  ]);

  // Eventbrite takes priority; drop any MDX event whose slug collides
  const ebSlugs = new Set(ebEvents.map((e) => e.slug));
  const filteredMdx = mdxEvents.filter((e) => !ebSlugs.has(e.slug));

  const all = [...ebEvents, ...filteredMdx];
  return all.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
}

/**
 * Retrieves a single event by its slug.
 * Returns null if not found.
 */
export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const all = await getAllEvents();
  return all.find((e) => e.slug === slug) ?? null;
}

/**
 * Returns upcoming events (date >= today, status !== 'cancelled').
 * Sorted ascending (soonest first).
 */
export async function getUpcomingEvents(limit = 3): Promise<EventData[]> {
  const today = new Date().toISOString().slice(0, 10);
  const all = await getAllEvents();
  return all
    .filter((e) => e.date >= today && e.status !== "cancelled")
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
    .slice(0, limit);
}
