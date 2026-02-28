"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={clsx("divide-y divide-mist", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `accordion-${index}`;
        const panelId = `${id}-panel`;

        return (
          <div key={index} className="py-4">
            <button
              id={id}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between text-left gap-4 group"
            >
              <span className="font-display text-lg text-charcoal-800 group-hover:text-forest-600 transition-colors">
                {item.question}
              </span>
              <span
                className={clsx(
                  "shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-mist-dark text-charcoal-600 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={id}
              className={clsx(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
              )}
            >
              <p className="text-charcoal-600 leading-relaxed pr-8">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
