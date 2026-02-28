import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { EventData, EventFrontmatter } from "@/types/event";

const EVENTS_DIR = path.join(process.cwd(), "src", "content", "events");

/**
 * Reads all .mdx files from src/content/events/ and returns parsed EventData.
 * Sorted by date descending (newest first).
 */
export function getAllEvents(): EventData[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];

  const files = fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const events: EventData[] = files.map((filename) => {
    const filePath = path.join(EVENTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      ...(data as EventFrontmatter),
      content: content.trim(),
    };
  });

  // Sort by date descending (newest first)
  return events.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Retrieves a single event by its slug.
 * Returns null if not found.
 */
export function getEventBySlug(slug: string): EventData | null {
  const all = getAllEvents();
  return all.find((e) => e.slug === slug) ?? null;
}

/**
 * Returns upcoming events (date >= today, status !== 'cancelled').
 * Sorted ascending (soonest first).
 * @param limit - Maximum number of events to return (default 3)
 */
export function getUpcomingEvents(limit = 3): EventData[] {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const upcoming = getAllEvents()
    .filter((e) => e.date >= today && e.status !== "cancelled")
    .sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

  return upcoming.slice(0, limit);
}
