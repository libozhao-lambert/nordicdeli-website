import { Button } from "@/components/ui/Button";

export function OurStoryTeaser() {
  return (
    <section
      className="bg-forest-800 py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="our-story-heading"
    >
      {/* Decorative background element */}
      <div
        className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-forest-600/30"
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 -bottom-16 w-64 h-64 rounded-full bg-birch-600/20"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-5">
          Our Philosophy
        </p>

        {/* Heading */}
        <h2
          id="our-story-heading"
          className="font-display text-display-md sm:text-display-lg text-white mb-8"
        >
          Warmth, Comfort and Hygge
        </h2>

        {/* Body */}
        <p className="text-cream-200/80 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
          At The Nordic Deli, we bring the essence of Nordic{" "}
          <em className="text-birch-400 not-italic font-medium">Hygge</em> to every
          coffee and meal. Every dish and handcrafted pastry is made with care and
          passion, blending the cosy traditions of the North with the laid-back
          charm of Australia. Whether it&apos;s a relaxing breakfast with friends or a
          leisurely lunch, every visit feels like home.
        </p>

        {/* CTA */}
        <Button href="/about" variant="primary">
          Read Our Story
        </Button>
      </div>
    </section>
  );
}
