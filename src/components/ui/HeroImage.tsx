import Image from "next/image";
import { clsx } from "clsx";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Full-width hero image with blurred-background sidebars.
 *
 * The foreground renders the complete image (object-contain) so nothing
 * is cropped regardless of the image's aspect ratio.  A blurred, slightly
 * scaled copy of the same image fills the background so wide landscape
 * images never leave empty space on either side.
 *
 * Works for very wide landscapes, portraits, and everything in between.
 */
export function HeroImage({ src, alt, priority, className }: HeroImageProps) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-charcoal-800",
        "h-[280px] sm:h-[380px] lg:h-[460px]",
        className
      )}
    >
      {/* Blurred background — covers the full container, scaled slightly to
          hide the soft edges that blur creates at the boundaries */}
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        className="object-cover scale-110 blur-xl"
        sizes="100vw"
      />

      {/* Dark tint so the foreground image pops */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* Sharp foreground — object-contain keeps the full image visible
          with no cropping or stretching at any aspect ratio */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain z-20"
        sizes="100vw"
      />
    </div>
  );
}
