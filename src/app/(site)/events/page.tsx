import type { Metadata } from "next";
import { getAllEvents, getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming events at The Nordic Deli — Midsommar feasts, baking masterclasses, and Nordic cultural experiences in Hope Island, Gold Coast.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | The Nordic Deli",
    description:
      "Join us for special Nordic-inspired events: seasonal feasts, baking classes, and more.",
  },
};

export default function EventsPage() {
  const allEvents = getAllEvents();
  const today = new Date().toISOString().slice(0, 10);

  const upcomingEvents = allEvents
    .filter((e) => e.date >= today && e.status !== "cancelled")
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const pastEvents = allEvents
    .filter((e) => e.date < today || e.status === "past")
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-3">
            Gather Together
          </p>
          <h1 className="font-display text-display-lg text-white mb-4">
            Events & Experiences
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto leading-relaxed">
            From intimate Midsommar feasts to hands-on baking masterclasses —
            celebrate the Nordic spirit with us.
          </p>
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Upcoming Events */}
          <section aria-labelledby="upcoming-heading" className="mb-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2
                id="upcoming-heading"
                className="font-display text-display-md text-charcoal-800"
              >
                Upcoming Events
              </h2>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-mist">
                <div className="text-4xl mb-4" aria-hidden="true">🌿</div>
                <h3 className="font-display text-xl text-charcoal-800 mb-2">
                  New Events Coming Soon
                </h3>
                <p className="text-charcoal-600 max-w-sm mx-auto mb-6">
                  We are busy planning our next Nordic experience. Check back
                  soon or follow us to stay updated.
                </p>
                <Button href="/contact" variant="ghost">
                  Get in Touch
                </Button>
              </div>
            )}
          </section>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section aria-labelledby="past-heading">
              <h2
                id="past-heading"
                className="font-display text-display-md text-charcoal-800 mb-8"
              >
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Private events CTA */}
          <section className="mt-20 bg-forest-800 rounded-3xl p-10 text-center text-white">
            <h2 className="font-display text-display-sm text-white mb-3">
              Planning a Private Event?
            </h2>
            <p className="text-cream-200 max-w-xl mx-auto mb-6">
              We host private functions, corporate breakfasts, and bespoke Nordic
              dining experiences. Get in touch to discuss your vision.
            </p>
            <Button href="/contact" variant="secondary">
              Enquire About Private Events
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
