import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildEventSchema } from "@/lib/schema/event";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroImage } from "@/components/ui/HeroImage";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/events/${slug}` },
    openGraph: {
      title: `${event.title} | The Nordic Deli`,
      description: event.description,
      type: "article",
      ...(event.image && {
        images: [{ url: event.image, alt: event.title }],
      }),
    },
  };
}

function formatEventDate(date: string): string {
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

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const schema = buildEventSchema(event);
  const statusInfo = statusConfig[event.status] ?? statusConfig.available;
  const allEvents = await getAllEvents();
  const relatedEvents = allEvents.filter((e) => e.slug !== slug).slice(0, 2);

  const paragraphs = event.content
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);

  const canBook =
    event.status === "available" && event.eventbriteUrl;

  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-cream-200/70">
              <li>
                <a href="/events" className="hover:text-cream-200 transition-colors">
                  Events
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-cream-200 truncate max-w-xs">{event.title}</li>
            </ol>
          </nav>

          <Badge variant={statusInfo.variant} className="mb-4">
            {statusInfo.label}
          </Badge>

          <h1 className="font-display text-display-lg text-white mb-4">
            {event.title}
          </h1>
          <p className="text-cream-200 text-lg leading-relaxed max-w-2xl">
            {event.description}
          </p>
        </div>
      </section>

      {/* Event image */}
      {event.image && (
        <HeroImage src={event.image} alt={event.title} priority />
      )}

      {/* Content */}
      <div className="bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article */}
            <article className="lg:col-span-2 prose-nordic">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-charcoal-700 leading-relaxed text-base mb-5 last:mb-0"
                >
                  {para}
                </p>
              ))}

              {/* Booking section */}
              <div className="mt-10 pt-8 border-t border-mist">
                {canBook ? (
                  <>
                    <h2 className="font-display text-xl text-charcoal-800 mb-4">
                      Ready to Join Us?
                    </h2>
                    <p className="text-charcoal-600 mb-6">
                      Tickets are sold through Eventbrite. Your place is
                      confirmed instantly once payment is complete.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        href={event.eventbriteUrl!}
                        variant="primary"
                        external
                      >
                        Get Tickets on Eventbrite
                      </Button>
                      <Button href="/contact" variant="ghost">
                        Any Questions? Contact Us
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-xl text-charcoal-800 mb-4">
                      How to Book
                    </h2>
                    <p className="text-charcoal-600 mb-6">
                      To secure your place at this event, please contact us via
                      phone or email. Payment is required at time of booking to
                      confirm your reservation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button href="/contact" variant="outline">
                        Enquire Now
                      </Button>
                      <Button href="tel:+61420960821" variant="ghost" external>
                        Call +61 420 960 821
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl border border-mist shadow-hygge-sm p-6 sticky top-24">
                <h2 className="font-display text-lg text-charcoal-800 mb-4">
                  Event Details
                </h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs text-charcoal-600 uppercase tracking-wide font-medium mb-1">Date</p>
                    <p className="text-charcoal-800 font-medium">{formatEventDate(event.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-600 uppercase tracking-wide font-medium mb-1">Time</p>
                    <p className="text-charcoal-800 font-medium">
                      {formatTime(event.time)}
                      {event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-600 uppercase tracking-wide font-medium mb-1">Location</p>
                    <p className="text-charcoal-800">{event.location}</p>
                  </div>
                  {event.seats !== undefined && (
                    <div>
                      <p className="text-xs text-charcoal-600 uppercase tracking-wide font-medium mb-1">Capacity</p>
                      <p className="text-charcoal-800">{event.seats} seats maximum</p>
                    </div>
                  )}
                  {event.price !== undefined && event.price > 0 && (
                    <div className="pt-4 border-t border-mist">
                      <p className="text-xs text-charcoal-600 uppercase tracking-wide font-medium mb-1">Price</p>
                      <p className="text-2xl font-bold text-forest-600">
                        ${event.price}
                        <span className="text-sm font-normal text-charcoal-600 ml-1">per person</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button
                    href={event.eventbriteUrl ?? "/contact"}
                    variant="outline"
                    className="w-full justify-center"
                    external={!!event.eventbriteUrl}
                  >
                    {event.eventbriteUrl ? "Get Tickets" : "Book Your Place"}
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related events */}
          {relatedEvents.length > 0 && (
            <section className="mt-16 pt-12 border-t border-mist">
              <h2 className="font-display text-display-sm text-charcoal-800 mb-8">
                More Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedEvents.map((e) => (
                  <EventCard key={e.slug} event={e} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
