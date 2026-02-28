"use client";

import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import type { MenuCategory } from "@/types/menu";

interface MenuCategoryTabsProps {
  categories: MenuCategory[];
}

export function MenuCategoryTabs({ categories }: MenuCategoryTabsProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const tabsRef = useRef<HTMLDivElement>(null);

  // Update active tab based on scroll position using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach((cat) => {
      const el = document.getElementById(`category-${cat.id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              setActiveId(cat.id);
            }
          });
        },
        {
          rootMargin: "-120px 0px -60% 0px",
          threshold: 0.2,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [categories]);

  const scrollToCategory = (categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (!el) return;

    const offset = 100; // account for sticky navbar + tabs
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(categoryId);
  };

  return (
    <div
      ref={tabsRef}
      className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-mist shadow-hygge-sm"
      role="tablist"
      aria-label="Menu categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
          {categories.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => scrollToCategory(cat.id)}
                className={clsx(
                  "shrink-0 px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 outline-none",
                  isActive
                    ? "bg-forest-600 text-white shadow-sm"
                    : "text-charcoal-600 hover:bg-mist hover:text-charcoal-800"
                )}
              >
                {cat.label}
                {cat.availableNote && (
                  <span
                    className={clsx(
                      "ml-2 text-[10px] font-normal",
                      isActive ? "text-white/70" : "text-charcoal-600/60"
                    )}
                  >
                    {cat.availableNote}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
