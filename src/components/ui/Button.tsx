import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";

const variants = {
  primary:
    "bg-cream text-forest-800 hover:bg-forest-100 focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2",
  secondary:
    "bg-birch-400 text-charcoal-800 hover:bg-birch-600 hover:text-white focus-visible:ring-2 focus-visible:ring-birch-400 focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-charcoal-700 hover:bg-mist border border-mist hover:border-mist-dark focus-visible:ring-2 focus-visible:ring-charcoal-700 focus-visible:ring-offset-2",
  outline:
    "bg-transparent text-forest-600 border-2 border-forest-600 hover:bg-forest-600 hover:text-white focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      "inline-flex items-center justify-center font-body font-semibold transition-all duration-200",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
