import type { Metadata } from "next";
import { MENU } from "@/data/menu";
import { MenuCategoryTabs } from "@/components/menu/MenuCategoryTabs";
import { MenuSection } from "@/components/menu/MenuSection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore our full Nordic-inspired menu — Scandinavian pastries, eggs your way, fresh wraps, açaí bowls, artisan coffee and more. Open daily 6:30am–2:30pm at Hope Island.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | The Nordic Deli",
    description:
      "Nordic-inspired café and deli menu. Handmade pastries, hearty breakfast and lunch, freshly brewed coffee.",
  },
};

export default function MenuPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-3">
            The Nordic Deli
          </p>
          <h1 className="font-display text-display-lg text-white mb-4">
            Our Menu
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Crafted with quality ingredients and Scandinavian inspiration. Every
            dish tells a story of warmth and tradition.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="birch">Open Daily 6:30am – 2:30pm</Badge>
            <Badge variant="white">Breakfast served all day</Badge>
          </div>
        </div>
      </section>

      {/* Dietary key */}
      <section className="bg-cream border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-charcoal-600">
            <span className="font-medium">Dietary guide:</span>
            <span><span className="font-semibold text-forest-600">VG</span> Vegetarian</span>
            <span><span className="font-semibold text-forest-600">V</span> Vegan</span>
            <span><span className="font-semibold text-birch-600">GF</span> Gluten Free</span>
            <span><span className="font-semibold text-birch-600">GFO</span> GF Option Available</span>
            <span><span className="font-semibold">DF</span> Dairy Free</span>
            <span className="text-charcoal-600/60 ml-auto">
              Please advise us of allergies when ordering.
            </span>
          </div>
        </div>
      </section>

      {/* Sticky category tabs */}
      <MenuCategoryTabs categories={MENU} />

      {/* Menu content */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {MENU.map((category, catIndex) => (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className={catIndex > 0 ? "pt-16 mt-4 border-t border-mist" : ""}
              aria-labelledby={`category-heading-${category.id}`}
            >
              {/* Category heading */}
              <div className="mb-10">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2
                    id={`category-heading-${category.id}`}
                    className="font-display text-display-md text-charcoal-800"
                  >
                    {category.label}
                  </h2>
                  {category.availableNote && (
                    <Badge variant="green">{category.availableNote}</Badge>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {category.sections.map((section) => (
                  <MenuSection key={section.id} section={section} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Allergen notice */}
      <section className="bg-mist border-t border-mist-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-sm text-charcoal-600 max-w-2xl mx-auto">
            <strong>Allergen notice:</strong> Our kitchen handles nuts, gluten,
            dairy, eggs, and other allergens. Please inform our staff of any
            dietary requirements or allergies before ordering. Menu items and
            prices are subject to change without notice.
          </p>
        </div>
      </section>
    </>
  );
}
