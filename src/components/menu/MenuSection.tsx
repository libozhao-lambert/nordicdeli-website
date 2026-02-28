import { clsx } from "clsx";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuSection as MenuSectionType } from "@/types/menu";

interface MenuSectionProps {
  section: MenuSectionType;
  className?: string;
}

export function MenuSection({ section, className }: MenuSectionProps) {
  return (
    <div className={clsx("", className)}>
      {/* Section header */}
      <div className="mb-5">
        <h3 className="font-display text-display-sm text-charcoal-800">
          {section.title}
        </h3>
        {section.subtitle && (
          <p className="mt-1 text-sm text-charcoal-600 italic">
            {section.subtitle}
          </p>
        )}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
