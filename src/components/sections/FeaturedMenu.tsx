import Image from "next/image";
import { FEATURED_ITEMS } from "@/data/menu";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const DIETARY_COLORS: Record<string, "green" | "birch" | "mist"> = {
  VG: "green",
  V: "green",
  GF: "birch",
  GFO: "birch",
  DF: "mist",
};

const ITEM_IMAGES: Record<string, { src: string; alt: string }> = {
  "avo-toast": {
    src: "/images/home/treats/home-treats-avocado-toast.webp",
    alt: "Avocado Toast on grilled sourdough",
  },
  "chicken-club": {
    src: "/images/home/treats/home-treats-chicken-club-sandwich.webp",
    alt: "Chicken Club Sandwich on Turkish bread",
  },
  kanelsnurre: {
    src: "/images/home/treats/home-treats-kanelsnurre.webp",
    alt: "Nordic Kanelsnurre cinnamon swirl",
  },
};

export function FeaturedMenu() {
  const featured = FEATURED_ITEMS.slice(0, 3);

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
            Nordic Signatures
          </p>
          <h2
            id="featured-heading"
            className="font-display text-display-md text-charcoal-800 mb-4"
          >
            Delicious Nordic Treats
          </h2>
          <p className="text-charcoal-600 text-lg max-w-xl mx-auto leading-relaxed">
            Handcrafted with love, inspired by the flavours of Scandinavia.
          </p>
        </div>

        {/* Featured items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((item) => {
            const img = ITEM_IMAGES[item.id];
            return (
              <div
                key={item.id}
                className="bg-cream rounded-2xl overflow-hidden hover:shadow-hygge transition-shadow duration-300 group"
              >
                {/* Image — 1:1 card */}
                <div className="relative w-full aspect-square overflow-hidden">
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-birch-200 to-mist" />
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal-800 group-hover:text-forest-600 transition-colors mb-2">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant={DIETARY_COLORS[tag] ?? "mist"}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button href="/menu" variant="outline" size="md">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
