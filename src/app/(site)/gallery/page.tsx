import type { Metadata } from "next";
import Image from "next/image";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments of Hygge at The Nordic Deli — a visual celebration of our Nordic-inspired café, handmade pastries, and the warmth of our Hope Island community.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | The Nordic Deli",
    description:
      "Beautiful imagery from The Nordic Deli — pastries, café moments, and Nordic warmth.",
  },
};

const JOURNAL_ARTICLES = [
  {
    src: "/images/journal/journal-01-morning.webp",
    alt: "Morning ritual at The Nordic Deli",
    category: "Rituals",
    title: "The Art of the Nordic Morning",
    description:
      "From the first grind of coffee to warm pastries fresh from the oven — how we begin each day with intention and quiet care.",
  },
  {
    src: "/images/journal/journal-02-food.webp",
    alt: "Nordic food crafted with honest ingredients",
    category: "Kitchen Stories",
    title: "Ingredients Tell the Story",
    description:
      "Every dish starts with honest, seasonal produce. We share what inspires our kitchen and the Scandinavian flavours we love.",
  },
  {
    src: "/images/journal/journal-03-life.webp",
    alt: "Community life at The Nordic Deli",
    category: "Community",
    title: "Life at The Deli",
    description:
      "Regulars become friends, strangers become neighbours. Hope Island has given us a home, and we give it back in every cup we pour.",
  },
  {
    src: "/images/journal/journal-04-welcome.webp",
    alt: "Welcome to The Nordic Deli",
    category: "Hygge",
    title: "Welcome to Hygge",
    description:
      "Hygge is not just a word — it is a feeling. A warm room, good food, and people you love. This is what we built The Nordic Deli for.",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-3">
            Visual Stories
          </p>
          <h1 className="font-display text-display-lg text-white mb-4">
            Moments of Hygge
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto leading-relaxed">
            A glimpse into the warmth and beauty of The Nordic Deli — our food,
            our space, and our community.
          </p>
        </div>
      </section>

      {/* Gallery — masonry with lightbox */}
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <GalleryGrid />
        </div>
      </div>

      {/* Nordic Journal */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="journal-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-14 max-w-xl">
            <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
              Stories from the Deli
            </p>
            <h2
              id="journal-heading"
              className="font-display text-display-md text-charcoal-800 mb-4"
            >
              The Nordic Journal
            </h2>
            <p className="text-charcoal-600 leading-relaxed">
              A visual diary of life at The Nordic Deli — recipes, behind-the-scenes
              moments, seasonal events, and the Scandinavian traditions that inspire
              everything we do.
            </p>
          </div>

          {/* Article cards — one image per article, landscape preferred */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-12">
            {JOURNAL_ARTICLES.map((article, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-2xl overflow-hidden bg-cream hover:shadow-hygge transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/2] overflow-hidden">
                  <Image
                    src={article.src}
                    alt={article.alt}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="font-body text-forest-600 text-xs tracking-widest uppercase mb-2">
                    {article.category}
                  </p>
                  <h3 className="font-display text-xl text-charcoal-800 group-hover:text-forest-600 transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed flex-1">
                    {article.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Button href="/contact" variant="outline">
              Stay in the Loop
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
