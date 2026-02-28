import Link from "next/link";

const BUSINESS = {
  address: "Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212",
  phone: "+61 420 960 821",
  email: "admin@thenordicdeli.com",
  hours: "Daily — 6:30am to 2:30pm",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.97!2d153.3721!3d-27.8613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDUxJzQwLjciUyAxNTPCsDIyJzE5LjYiRQ!5e0!3m2!1sen!2sau!4v1000000000000",
  mapsUrl:
    "https://maps.google.com/?q=Shop+15%2F10+Santa+Barbara+Rd,+Hope+Island+QLD+4212",
};

export function FindUs() {
  return (
    <section
      className="bg-cream py-20 md:py-28"
      aria-labelledby="find-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
            Come Visit
          </p>
          <h2
            id="find-us-heading"
            className="font-display text-display-md text-charcoal-800"
          >
            Find Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Info card */}
          <div className="bg-white rounded-3xl p-8 shadow-hygge flex flex-col justify-between gap-8">
            {/* Address */}
            <div>
              <h3 className="font-display text-xl text-charcoal-800 mb-3">
                Address
              </h3>
              <address className="not-italic">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal-600 hover:text-forest-600 transition-colors leading-relaxed"
                >
                  {BUSINESS.address}
                </a>
              </address>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-display text-xl text-charcoal-800 mb-3">
                Opening Hours
              </h3>
              <div className="bg-forest-50 rounded-xl p-4">
                <p className="font-body text-charcoal-700 font-medium">
                  {BUSINESS.hours}
                </p>
                <p className="text-sm text-charcoal-600 mt-1">
                  Last coffee orders 2:00pm
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-xl text-charcoal-800 mb-3">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-charcoal-600 hover:text-forest-600 transition-colors"
                  >
                    <span aria-hidden="true">📞</span>
                    <span>{BUSINESS.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex items-center gap-2 text-charcoal-600 hover:text-forest-600 transition-colors"
                  >
                    <span aria-hidden="true">✉️</span>
                    <span>{BUSINESS.email}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Reserve CTA */}
            <Link
              href="/reserve"
              className="inline-flex items-center justify-center py-3 px-6 bg-forest-600 text-white rounded-xl font-body font-medium hover:bg-forest-800 transition-colors text-center"
            >
              Reserve a Table →
            </Link>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-hygge min-h-[320px] lg:min-h-0">
            <iframe
              src={BUSINESS.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Nordic Deli location on Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
