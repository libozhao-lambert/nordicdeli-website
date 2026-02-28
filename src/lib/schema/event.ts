import type { EventData } from "@/types/event";

/**
 * Builds a schema.org Event JSON-LD object.
 */
export function buildEventSchema(event: EventData) {
  const siteUrl = "https://nordicdeli.anchornetwork.ai";

  // Build ISO datetime strings from date + time
  const startDateTime = `${event.date}T${event.time}:00+10:00`;
  const endDateTime = event.endTime
    ? `${event.date}T${event.endTime}:00+10:00`
    : undefined;

  const statusMap: Record<string, string> = {
    available: "https://schema.org/EventScheduled",
    "sold-out": "https://schema.org/EventScheduled",
    cancelled: "https://schema.org/EventCancelled",
    past: "https://schema.org/EventScheduled",
  };

  const availabilityMap: Record<string, string> = {
    available: "https://schema.org/InStock",
    "sold-out": "https://schema.org/SoldOut",
    cancelled: "https://schema.org/Discontinued",
    past: "https://schema.org/SoldOut",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: startDateTime,
    ...(endDateTime && { endDate: endDateTime }),
    eventStatus: statusMap[event.status] ?? "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "The Nordic Deli",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop 15/10 Santa Barbara Rd",
        addressLocality: "Hope Island",
        addressRegion: "QLD",
        postalCode: "4212",
        addressCountry: "AU",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "The Nordic Deli",
      url: siteUrl,
    },
    url: `${siteUrl}/events/${event.slug}`,
    ...(event.image && { image: `${siteUrl}${event.image}` }),
    ...(event.price !== undefined &&
      event.price > 0 && {
        offers: {
          "@type": "Offer",
          price: event.price,
          priceCurrency: "AUD",
          availability: availabilityMap[event.status] ?? "https://schema.org/InStock",
          url: `${siteUrl}/events/${event.slug}`,
        },
      }),
    ...(event.seats !== undefined && {
      maximumAttendeeCapacity: event.seats,
    }),
  };
}
