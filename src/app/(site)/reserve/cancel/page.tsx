import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancel Reservation",
  description: "Cancel your reservation at The Nordic Deli.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

async function cancelReservation(token: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://nordicdeli.anchornetwork.ai";
    const res = await fetch(`${baseUrl}/api/reservations/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({})) as { error?: string };
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Cancellation failed." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not connect to the server. Please try again." };
  }
}

export default async function CancelPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="bg-cream min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <h1 className="font-display text-3xl text-charcoal-800 mb-4">
            Invalid Link
          </h1>
          <p className="text-charcoal-600 mb-8">
            This cancellation link is missing a token. Please use the link from
            your confirmation email, or contact us directly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>
    );
  }

  const result = await cancelReservation(token);

  return (
    <main className="bg-cream min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {result.ok ? (
          <>
            <div className="w-16 h-16 rounded-full bg-forest-600/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-forest-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="font-display text-3xl text-charcoal-800 mb-4">
              Reservation Cancelled
            </h1>
            <p className="text-charcoal-600 mb-8">
              Your reservation has been successfully cancelled. We hope to see
              you another time!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/reserve"
                className="inline-flex items-center justify-center px-6 py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-800 transition-colors"
              >
                Book Again
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-mist text-charcoal-800 rounded-xl font-medium hover:border-charcoal-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="font-display text-3xl text-charcoal-800 mb-4">
              Cancellation Failed
            </h1>
            <p className="text-charcoal-600 mb-2">
              {result.error ?? "Something went wrong."}
            </p>
            <p className="text-charcoal-600 mb-8">
              This link may have already been used or may have expired. Please
              contact us directly if you need assistance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-800 transition-colors"
            >
              Contact Us
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
