"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// Aspect ratios chosen to reflect typical photography composition per subject
const GALLERY_IMAGES = [
  {
    src: "/images/gallery/gallery-01-exterior.webp",
    alt: "The Nordic Deli — Hope Island exterior",
    aspect: "aspect-video",
  },
  {
    src: "/images/gallery/gallery-02-interior.webp",
    alt: "Inside The Nordic Deli",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/gallery-03-kanelsnurre.webp",
    alt: "Our signature Kanelsnurre cinnamon swirl",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/gallery-04-breakfast.webp",
    alt: "Nordic breakfast spread",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/gallery-05-breakfast.webp",
    alt: "Morning at The Nordic Deli",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/gallery-06-dining.webp",
    alt: "Dining at The Nordic Deli",
    aspect: "aspect-video",
  },
  {
    src: "/images/gallery/gallery-07-dining.webp",
    alt: "Nordic dining experience",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/gallery/gallery-08-conversation.webp",
    alt: "Conversations over coffee",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/gallery-09-conversation.webp",
    alt: "Café conversations",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/gallery-10-detail.webp",
    alt: "A Nordic detail",
    aspect: "aspect-[2/3]",
  },
  {
    src: "/images/gallery/gallery-11-detail.webp",
    alt: "Handcrafted detail",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/gallery-12-quiet.webp",
    alt: "A quiet Nordic moment",
    aspect: "aspect-video",
  },
];

export function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fade-in on scroll
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
      { threshold: 0.06 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard nav + scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((i) =>
          i !== null ? (i + 1) % GALLERY_IMAGES.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i !== null
            ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
            : null
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % GALLERY_IMAGES.length : null
    );
  }, []);

  return (
    <>
      {/* Masonry grid — CSS columns, natural aspect ratios */}
      <div className="columns-2 md:columns-3 gap-3 md:gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="block break-inside-avoid mb-3 md:mb-4 w-full text-left group"
            aria-label={`View photo: ${img.alt}`}
          >
            <div
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className={`relative w-full ${img.aspect} overflow-hidden rounded-xl`}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.65s ease ${i * 0.04}s, transform 0.65s ease ${i * 0.04}s`,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-800/95"
          onClick={(e) => {
            if (e.target === lightboxRef.current) setLightboxIndex(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close lightbox"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d="M7 7L21 21M21 7L7 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={goPrev}
            className="absolute left-3 md:left-6 p-2 text-white/70 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Previous photo"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d="M17 6L10 14L17 22"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-5xl w-full max-h-[82vh] flex items-center justify-center">
            <Image
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              width={1600}
              height={1200}
              className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-lg"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            className="absolute right-3 md:right-6 p-2 text-white/70 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Next photo"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d="M11 6L18 14L11 22"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </p>
        </div>
      )}
    </>
  );
}
