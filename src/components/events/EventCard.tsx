import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import type { EventData } from "@/types/event";

interface EventCardProps {
  event: EventData;
  className?: string;
}

function formatEventDate(date: string): string {
  // date is YYYY-MM-DD
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  // time is HH:mm (24h) — convert to 12h
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")}${ampm}`;
}

const statusConfig: Record<
  string,
  { label: string; variant: "green" | "birch" | "mist" | "white" }
> = {
  available: { label: "Tickets Available", variant: "green" },
  "sold-out": { label: "Sold Out", variant: "birch" },
  cancelled: { label: "Cancelled", variant: "mist" },
  past: { label: "Past Event", variant: "mist" },
};

export function EventCard({ event, className }: EventCardProps) {
  const {
    slug,
    title,
    date,
    time,
    endTime,
    location,
    description,
    image,
    price,
    seats,
    status,
  } = event;

  const statusInfo = statusConfig[status] ?? statusConfig.available;
  const isPast = status === "past" || status === "cancelled";

  return (
    <Link
      href={`/events/${slug}`}
      className={clsx(
        "group block bg-white rounded-2xl overflow-hidden shadow-hygge hover:shadow-hygge-lg transition-all duration-300",
        "border border-mist/60 hover:border-birch-200",
        isPast && "opacity-75",
        className
      )}
    >
      {/* Event image or colour band */}
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div
          className={clsx(
            "h-2",
            status === "available" ? "bg-forest-600" : "bg-mist-dark"
          )}
        />
      )}

      <div className="p-6">
        {/* Status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          {seats !== undefined && status === "available" && (
            <span className="text-xs text-charcoal-600">
              {seats} seats
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-charcoal-800 group-hover:text-forest-600 transition-colors leading-snug mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-charcoal-700">
            <svg
              className="w-4 h-4 shrink-0 text-forest-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span>{formatEventDate(date)}</span>
          </div>

          <div className="flex items-center gap-2 text-charcoal-700">
            <svg
              className="w-4 h-4 shrink-0 text-forest-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {formatTime(time)}
              {endTime ? ` – ${formatTime(endTime)}` : ""}
            </span>
          </div>

          <div className="flex items-start gap-2 text-charcoal-700">
            <svg
              className="w-4 h-4 shrink-0 text-forest-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="leading-tight">{location}</span>
          </div>
        </div>

        {/* Price */}
        {price !== undefined && price > 0 && (
          <div className="mt-4 pt-4 border-t border-mist flex items-center justify-between">
            <span className="text-xs text-charcoal-600 uppercase tracking-wide">
              Per person
            </span>
            <span className="font-body font-bold text-forest-600 text-xl">
              ${price}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
