import Link from "next/link";
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

export function FeaturedMenu() {
  // Show up to 3 featured items
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
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-cream rounded-2xl p-6 hover:shadow-hygge transition-shadow duration-300 group"
            >
              {/* Placeholder food icon */}
              <div
                className="w-full aspect-[3/2] rounded-xl mb-5 flex items-center justify-center text-5xl bg-gradient-to-br from-birch-200 to-mist"
                aria-hidden="true"
              >
                {item.id.includes("kanelsnurre")
                  ? "🥐"
                  : item.id.includes("carrot")
                  ? "🍰"
                  : "🎂"}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display text-xl text-charcoal-800 group-hover:text-forest-600 transition-colors">
                  {item.name}
                </h3>
                {item.price && (
                  <span className="shrink-0 font-body font-semibold text-forest-600">
                    ${item.price}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
                  {item.description}
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={DIETARY_COLORS[tag] ?? "mist"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
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
