import type { Metadata } from "next";
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

// Placeholder gallery items with colour swatches and labels
const placeholderItems = [
  {
    label: "Kanelsnurre",
    sub: "Our signature cinnamon swirl",
    bg: "bg-birch-200",
    text: "text-birch-800",
  },
  {
    label: "Morning Brew",
    sub: "Artisan coffee, Nordic style",
    bg: "bg-forest-100",
    text: "text-forest-800",
  },
  {
    label: "Nordic Porridge",
    sub: "Warm & comforting",
    bg: "bg-cream-100",
    text: "text-charcoal-700",
  },
  {
    label: "Drømmekage",
    sub: "Our dream cake",
    bg: "bg-mist",
    text: "text-charcoal-700",
  },
  {
    label: "The Deli",
    sub: "Our Hope Island home",
    bg: "bg-forest-50",
    text: "text-forest-800",
  },
  {
    label: "Open Sandwiches",
    sub: "Smørrebrød Scandinavian style",
    bg: "bg-birch-200",
    text: "text-birch-800",
  },
  {
    label: "Hygge Moments",
    sub: "Warmth & connection",
    bg: "bg-cream-200",
    text: "text-charcoal-700",
  },
  {
    label: "Fresh Pastries",
    sub: "Baked every morning",
    bg: "bg-forest-100",
    text: "text-forest-800",
  },
  {
    label: "Açaí Bowl",
    sub: "A Nordic-Australian fusion",
    bg: "bg-mist",
    text: "text-charcoal-700",
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

      {/* Coming Soon notice */}
      <section className="bg-birch-200/30 border-b border-birch-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-3">
          <span className="text-birch-800 text-sm font-medium">
            📸 Full photo gallery coming soon — beautiful imagery is on its way!
          </span>
        </div>
      </section>

      {/* Gallery grid */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {placeholderItems.map((item, i) => (
              <div
                key={i}
                className={`${item.bg} aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center`}
              >
                <p className={`font-display text-xl ${item.text} font-semibold leading-snug`}>
                  {item.label}
                </p>
                <p className={`${item.text} opacity-70 text-sm mt-1`}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Journal / blog concept */}
          <section className="mt-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-body text-birch-600 text-sm tracking-widest uppercase mb-3">
                Coming Soon
              </p>
              <h2 className="font-display text-display-sm text-charcoal-800 mb-4">
                The Nordic Journal
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                We are building a visual diary of life at The Nordic Deli — a
                place to share recipes, behind-the-scenes moments, seasonal
                events, and stories about the Scandinavian traditions that
                inspire everything we do.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                Follow along as we photograph our pastries fresh from the oven,
                document special events like our Midsommar feast, and capture
                the everyday Hygge of our café community.
              </p>
              <Button href="/contact" variant="outline">
                Stay in the Loop
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-forest-100 rounded-2xl aspect-[3/4]" />
              <div className="bg-birch-200 rounded-2xl aspect-[3/4] mt-8" />
              <div className="bg-mist rounded-2xl aspect-[3/4]" />
              <div className="bg-cream-200 rounded-2xl aspect-[3/4] mt-8" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
