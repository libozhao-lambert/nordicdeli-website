import { getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";

export function UpcomingEvents() {
  const events = getUpcomingEvents(2);

  return (
    <section
      className="bg-cream-100 py-20 md:py-28"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
              Join Us
            </p>
            <h2
              id="upcoming-events-heading"
              className="font-display text-display-md text-charcoal-800"
            >
              Upcoming Events
            </h2>
          </div>
          <Button href="/events" variant="ghost" size="sm">
            All Events →
          </Button>
        </div>

        {/* Events grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-white rounded-2xl border border-mist">
            <div className="text-4xl mb-4" aria-hidden="true">🌿</div>
            <p className="font-display text-xl text-charcoal-800 mb-2">
              New Events Coming Soon
            </p>
            <p className="text-charcoal-600 max-w-sm mx-auto text-sm">
              We are busy planning our next Nordic experience. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
