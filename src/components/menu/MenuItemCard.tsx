import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import type { MenuItem } from "@/types/menu";
import { DIETARY_LABELS } from "@/data/menu";

const DIETARY_BADGE_VARIANTS: Record<
  string,
  "green" | "birch" | "mist" | "white"
> = {
  VG: "green",
  V: "green",
  GF: "birch",
  GFO: "birch",
  DF: "mist",
  N: "white",
};

interface MenuItemCardProps {
  item: MenuItem;
  className?: string;
}

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  const { name, description, price, variants, tags } = item;

  return (
    <div
      className={clsx(
        "group bg-white rounded-2xl p-5 shadow-hygge-sm hover:shadow-hygge",
        "border border-mist/60 hover:border-birch-200 transition-all duration-200",
        className
      )}
    >
      {/* Name + Price row */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug text-charcoal-800 group-hover:text-forest-600 transition-colors">
          {name}
        </h3>
        {price !== undefined && !variants && (
          <span className="shrink-0 font-body font-semibold text-forest-600 text-base">
            ${price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-1.5 text-sm text-charcoal-600 leading-relaxed">
          {description}
        </p>
      )}

      {/* Variants (e.g. Small / Large) */}
      {variants && variants.length > 0 && (
        <div className="mt-3 space-y-1">
          {variants.map((variant) => (
            <div
              key={variant.label}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-charcoal-600">{variant.label}</span>
              <span className="text-sm font-semibold text-forest-600">
                ${variant.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Dietary tags */}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={DIETARY_BADGE_VARIANTS[tag] ?? "mist"}
              className="text-[10px]"
            >
              {tag} · {DIETARY_LABELS[tag] ?? tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
