import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Nordic Deli in Hope Island, Gold Coast. Questions, catering enquiries, or just want to say hello — we'd love to hear from you.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — The Nordic Deli",
    description:
      "Get in touch with The Nordic Deli in Hope Island, Gold Coast.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-cream min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest text-birch-600 uppercase mb-3">
            Contact
          </p>
          <h1 className="font-display text-display-md text-charcoal-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            We&apos;d love to hear from you. Send us a message below, or find us
            at the café — the kettle&apos;s always on.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Contact info + Map */}
          <div className="space-y-8">
            {/* Visit info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hygge border border-mist">
              <h2 className="font-display text-xl text-charcoal-800 mb-5">
                Visit Us
              </h2>
              <dl className="space-y-4">
                <div className="flex gap-3">
                  <dt className="sr-only">Address</dt>
                  <svg
                    className="w-5 h-5 text-forest-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <dd className="text-charcoal-600 text-sm leading-relaxed">
                    Shop 15/10 Santa Barbara Rd
                    <br />
                    Hope Island QLD 4212
                    <br />
                    Australia
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="sr-only">Phone</dt>
                  <svg
                    className="w-5 h-5 text-forest-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <dd>
                    <a
                      href="tel:+61420960821"
                      className="text-charcoal-600 text-sm hover:text-forest-600 transition-colors"
                    >
                      +61 420 960 821
                    </a>
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="sr-only">Email</dt>
                  <svg
                    className="w-5 h-5 text-forest-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <dd>
                    <a
                      href="mailto:admin@thenordicdeli.com"
                      className="text-charcoal-600 text-sm hover:text-forest-600 transition-colors"
                    >
                      admin@thenordicdeli.com
                    </a>
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="sr-only">Opening hours</dt>
                  <svg
                    className="w-5 h-5 text-forest-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <dd className="text-charcoal-600 text-sm leading-relaxed">
                    Monday – Sunday
                    <br />
                    6:30 am – 2:30 pm (AEST)
                  </dd>
                </div>
              </dl>
            </div>

            {/* Map */}
            <MapEmbed />
          </div>

          {/* Right: Contact form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hygge border border-mist">
            <h2 className="font-display text-xl text-charcoal-800 mb-5">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
