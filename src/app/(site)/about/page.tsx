import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind The Nordic Deli — a Hope Island café bringing Scandinavian Hygge, handcrafted pastries, and Nordic warmth to the Gold Coast.",
  openGraph: {
    title: "About | The Nordic Deli",
    description:
      "The story of warmth, comfort and Hygge at Hope Island's Nordic café and bakery.",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest-800 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-display text-display-lg text-white mb-4">
            Warmth, Comfort and Hygge
          </h1>
          <p className="text-cream-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Bringing the spirit of Scandinavia to the heart of Hope Island.
          </p>
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        {/* Story section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Intro */}
          <div className="text-center mb-16">
            <h2 className="font-display text-display-sm text-charcoal-800 mb-6">
              The Nordic Deli was born from a love of Scandinavian food culture
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed">
              We believe that a great meal is more than nourishment — it&apos;s a
              moment of connection, warmth, and belonging. That&apos;s the essence of{" "}
              <strong className="text-forest-600">Hygge</strong>, the Danish and
              Norwegian concept of cosiness and togetherness.
            </p>
          </div>

          {/* What is Hygge */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-hygge mb-12">
            <h3 className="font-display text-2xl text-charcoal-800 mb-4">
              What is Hygge?
            </h3>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              Pronounced &quot;hoo-ga&quot;, Hygge is a Scandinavian concept that
              embodies cosiness, comfort, and the simple joy of being present.
              It&apos;s the warmth of a cup of coffee shared with a friend, the smell
              of freshly baked cinnamon swirls, the glow of soft morning light.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              At The Nordic Deli, we infuse Hygge into everything — from the
              welcoming atmosphere of our café to the carefully crafted flavours
              of our menu. When you walk through our door, we want you to feel
              at home.
            </p>
          </div>

          {/* Two columns: Craft + Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-hygge">
              <div className="text-3xl mb-4" aria-hidden="true">🍞</div>
              <h3 className="font-display text-xl text-charcoal-800 mb-3">
                Handcrafted with Passion
              </h3>
              <p className="text-charcoal-600 leading-relaxed text-sm">
                Every pastry is made from scratch in our kitchen. Our Kanelsnurre
                (cinnamon swirls), Drømmekage, and Nordic Carrot Cake are baked
                fresh each morning — because the best things in life can&apos;t be
                rushed.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-hygge">
              <div className="text-3xl mb-4" aria-hidden="true">🌿</div>
              <h3 className="font-display text-xl text-charcoal-800 mb-3">
                Quality Ingredients
              </h3>
              <p className="text-charcoal-600 leading-relaxed text-sm">
                We source the finest local and imported ingredients to honour the
                Nordic tradition of simplicity done exceptionally well. From free-range
                eggs to freshly milled flours, every component matters.
              </p>
            </div>
          </div>

          {/* The deli */}
          <div className="bg-forest-800 rounded-3xl p-8 md:p-12 text-white mb-12">
            <h3 className="font-display text-2xl text-white mb-4">
              A Place to Belong
            </h3>
            <p className="text-cream-200/80 leading-relaxed mb-4">
              The Nordic Deli is more than a café. We are a gathering place for
              the Hope Island community — a spot where locals start their mornings,
              where friends catch up over coffee, and where families share a
              leisurely brunch. We are proud to be part of your daily rhythm.
            </p>
            <p className="text-cream-200/80 leading-relaxed">
              Whether you&apos;re discovering Nordic food for the first time or you&apos;ve
              grown up with cinnamon swirls and rye bread, we welcome you with
              open arms and warm pastries.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="font-display text-display-sm text-charcoal-800 mb-6">
              Come experience it for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/reserve" variant="outline" size="lg">
                Reserve a Table
              </Button>
              <Button href="/menu" variant="ghost" size="lg">
                View Our Menu
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
