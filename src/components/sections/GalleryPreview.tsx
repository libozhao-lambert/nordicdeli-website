import Link from "next/link";

const PLACEHOLDER_ITEMS = [
  { label: "Morning light", bg: "bg-birch-200" },
  { label: "Nordic pastries", bg: "bg-mist" },
  { label: "Coffee ritual", bg: "bg-cream-200" },
  { label: "Kanelsnurre", bg: "bg-birch-400/30" },
  { label: "Hygge moment", bg: "bg-forest-100" },
  { label: "Handcrafted", bg: "bg-mist-dark" },
];

export function GalleryPreview() {
  return (
    <section
      className="bg-white py-20 md:py-28"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
              Captured Moments
            </p>
            <h2
              id="gallery-preview-heading"
              className="font-display text-display-md text-charcoal-800"
            >
              Moments of Hygge
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm font-body text-forest-600 hover:text-forest-800 transition-colors"
          >
            View Gallery →
          </Link>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PLACEHOLDER_ITEMS.map((item, i) => (
            <Link
              key={i}
              href="/gallery"
              className={`group relative aspect-square rounded-2xl overflow-hidden ${item.bg} hover:opacity-90 transition-opacity`}
              aria-label={`Gallery image: ${item.label}`}
            >
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-charcoal-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-body">{item.label}</span>
              </div>
              {/* Photo icon placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-charcoal-800/20"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="6"
                    width="28"
                    height="20"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="24" cy="11" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal-600/60 mt-6">
          Photography coming soon — follow us on Instagram for the latest snaps
        </p>
      </div>
    </section>
  );
}
