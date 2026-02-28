import { clsx } from "clsx";

const variants = {
  green: "bg-forest-100 text-forest-800",
  birch: "bg-birch-200 text-birch-800",
  mist: "bg-mist text-charcoal-700",
  white: "bg-white text-charcoal-700 border border-mist",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export function Badge({ children, variant = "mist", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
