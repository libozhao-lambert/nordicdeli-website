import type { Metadata } from "next";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { ReservationFAQ } from "@/components/reservation/ReservationFAQ";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at The Nordic Deli in Hope Island. We're open daily from 6:30 am to 2:30 pm. Reserve online in seconds.",
  alternates: { canonical: "/reserve" },
  openGraph: {
    title: "Reserve a Table — The Nordic Deli",
    description:
      "Book your table at The Nordic Deli in Hope Island. Open daily 6:30 am – 2:30 pm.",
  },
};

export default function ReservePage() {
  return (
    <main className="bg-cream min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-widest text-birch-600 uppercase mb-3">
            Reserve
          </p>
          <h1 className="font-display text-display-md text-charcoal-800 mb-4">
            Book Your Table
          </h1>
          <p className="text-charcoal-600 leading-relaxed max-w-lg mx-auto">
            Reserve a table online in just a few moments. We hold your table for
            15 minutes — a confirmation email with your booking details will
            arrive shortly.
          </p>
        </div>

        {/* Hours reminder */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-charcoal-600">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-forest-600"
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
            Open daily 6:30 am – 2:30 pm
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-forest-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Up to 12 guests
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-forest-600"
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
            Instant email confirmation
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hygge border border-mist">
          <ReservationForm />
        </div>

        {/* FAQ */}
        <ReservationFAQ />
      </div>
    </main>
  );
}
