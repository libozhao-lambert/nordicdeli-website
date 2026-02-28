import { clsx } from "clsx";
import Image from "next/image";

interface CardProps {
  title: string;
  description?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  className?: string;
  href?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  price,
  image,
  imageAlt,
  badge,
  className,
  href,
  children,
}: CardProps) {
  const content = (
    <div
      className={clsx(
        "group bg-white rounded-2xl overflow-hidden shadow-hygge hover:shadow-hygge-lg transition-all duration-300",
        className
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-forest-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl text-charcoal-800 leading-snug">
            {title}
          </h3>
          {price && (
            <span className="shrink-0 font-body font-semibold text-forest-600 text-base">
              {price}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-charcoal-600 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
