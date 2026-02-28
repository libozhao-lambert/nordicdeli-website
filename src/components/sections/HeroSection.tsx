import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Welcome to The Nordic Deli"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-600 to-charcoal-800"
        aria-hidden="true"
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Eyebrow */}
        <p className="font-body text-birch-400 text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in">
          Hope Island · Gold Coast · Australia
        </p>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight animate-slide-up">
          Experience Nordic Delights
          <br />
          <span className="text-birch-400">at The Nordic Deli</span>
        </h1>

        {/* Subline */}
        <p className="text-cream-200/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Authentic Scandinavian flavours and handmade treats in the heart of
          Hope Island. Where every visit feels like home.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/menu" variant="secondary" size="lg">
            View Menu
          </Button>
          <Button
            href="/reserve"
            size="lg"
            className="bg-white text-forest-800 hover:bg-cream border-0 font-semibold"
          >
            Reserve a Table →
          </Button>
        </div>

        {/* Hours badge */}
        <div className="mt-12 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
          <span className="w-2 h-2 rounded-full bg-birch-400 animate-pulse" aria-hidden="true" />
          <span className="text-white/90 text-sm font-body">
            Open Daily · 6:30am – 2:30pm
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white/50"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
