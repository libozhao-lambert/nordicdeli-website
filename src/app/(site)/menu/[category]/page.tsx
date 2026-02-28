import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MENU, getCategoryById } from "@/data/menu";
import { MenuSection } from "@/components/menu/MenuSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MenuCategoryId } from "@/types/menu";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "breakfast" },
    { category: "lunch" },
    { category: "extras" },
  ];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    return { title: "Menu Category Not Found" };
  }

  const descriptions: Record<string, string> = {
    breakfast:
      "Start your day with Nordic-inspired breakfast dishes — eggs your way, wraps, bowls, fresh pastries and artisan coffee.",
    lunch:
      "Enjoy our Nordic lunch menu featuring fresh open sandwiches, smørrebrød, soups and seasonal specials.",
    extras:
      "Add-ons, sides, and extras to complement your Nordic Deli meal. Coffee, drinks, and more.",
  };

  return {
    title: `${category.label} Menu`,
    description:
      descriptions[categoryId] ??
      `The Nordic Deli ${category.label} menu — Scandinavian-inspired flavours in Hope Island.`,
    alternates: { canonical: `/menu/${categoryId}` },
    openGraph: {
      title: `${category.label} Menu | The Nordic Deli`,
    },
  };
}

export default async function CategoryMenuPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId as MenuCategoryId);

  if (!category) {
    notFound();
  }

  // Breadcrumb labels
  const sectionCount = category.sections.length;
  const itemCount = category.sections.reduce(
    (acc, s) => acc + s.items.length,
    0
  );

  return (
    <>
      {/* Page header */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center justify-center gap-2 text-sm text-cream-200/70">
                <li>
                  <a href="/menu" className="hover:text-cream-200 transition-colors">
                    Menu
                  </a>
                </li>
                <li aria-hidden="true">›</li>
                <li className="text-cream-200">{category.label}</li>
              </ol>
            </nav>
            <h1 className="font-display text-display-lg text-white mb-4">
              {category.label}
            </h1>
            {category.availableNote && (
              <Badge variant="birch" className="mb-4">
                {category.availableNote}
              </Badge>
            )}
            <p className="text-cream-200/80 text-sm">
              {sectionCount} section{sectionCount !== 1 ? "s" : ""} · {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Category tabs (other categories) */}
      <nav className="bg-white border-b border-mist" aria-label="Other categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {MENU.map((cat) => (
            <a
              key={cat.id}
              href={`/menu/${cat.id}`}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cat.id === categoryId
                  ? "bg-forest-600 text-white"
                  : "text-charcoal-600 hover:bg-mist"
              }`}
              aria-current={cat.id === categoryId ? "page" : undefined}
            >
              {cat.label}
            </a>
          ))}
          <a
            href="/menu"
            className="shrink-0 ml-auto px-4 py-2 rounded-lg text-sm font-medium text-charcoal-600 hover:bg-mist transition-colors"
          >
            Full Menu
          </a>
        </div>
      </nav>

      {/* Dietary key */}
      <div className="bg-cream border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-charcoal-600">
            <span className="font-medium">Dietary guide:</span>
            <span><span className="font-semibold text-forest-600">VG</span> Vegetarian</span>
            <span><span className="font-semibold text-forest-600">V</span> Vegan</span>
            <span><span className="font-semibold text-birch-600">GF</span> Gluten Free</span>
            <span><span className="font-semibold text-birch-600">GFO</span> GF Option</span>
            <span><span className="font-semibold">DF</span> Dairy Free</span>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-14">
            {category.sections.map((section) => (
              <MenuSection key={section.id} section={section} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-mist text-center">
            <p className="text-charcoal-600 mb-6">
              Ready to visit? Reserve your table or explore the full menu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/reserve" variant="outline">
                Reserve a Table
              </Button>
              <Button href="/menu" variant="ghost">
                View Full Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
