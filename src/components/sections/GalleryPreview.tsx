"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// aspect ratio chosen per image to create a natural staggered column flow
const HYGGE_IMAGES = [
  {
    src: "/images/home/hygge/home-hygge-01.webp",
    alt: "Morning light at The Nordic Deli",
    aspect: "aspect-[2/3]",
  },
  {
    src: "/images/home/hygge/home-hygge-02.webp",
    alt: "Nordic café warmth",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/home/hygge/home-hygge-03.webp",
    alt: "Handcrafted pastries at The Deli",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/home/hygge/home-hygge-04.webp",
    alt: "A place to belong",
    aspect: "aspect-[3/2]",
  },
  {
    src: "/images/home/hygge/home-hygge-05.webp",
    alt: "Cosy Nordic dining",
    aspect: "aspect-[2/3]",
  },
  {
    src: "/images/home/hygge/home-hygge-06.webp",
    alt: "Moments of Hygge",
    aspect: "aspect-[4/3]",
  },
];

export function GalleryPreview() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="bg-cream py-20 md:py-28"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-forest-600 text-sm tracking-widest uppercase mb-3">
              Captured Moments
            </p>
            <h2
              id="gallery-preview-heading"
              className="font-display text-display-md text-charcoal-800"
            >
              Moments of Hygge
            </h2>
          </div>
          <Link
            href="/gallery"
            className="shrink-0 text-sm font-body text-forest-600 hover:text-forest-800 transition-colors"
          >
            View Gallery →
          </Link>
        </div>

        {/* Masonry — CSS columns, variable height, no forced ratio */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {HYGGE_IMAGES.map((img, i) => (
            <Link
              key={i}
              href="/gallery"
              aria-label={img.alt}
              className="block break-inside-avoid mb-3 md:mb-4 group"
            >
              <div
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className={`relative w-full ${img.aspect} overflow-hidden rounded-2xl`}
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: `opacity 0.65s ease ${i * 0.09}s, transform 0.65s ease ${i * 0.09}s`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
