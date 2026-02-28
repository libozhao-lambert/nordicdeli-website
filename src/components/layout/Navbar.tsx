"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-hygge-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="The Nordic Deli — return to homepage"
            >
              <Image
                src="/images/logo/logo-circle.svg"
                alt=""
                width={40}
                height={40}
                className="shrink-0"
                priority
                aria-hidden="true"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl lg:text-2xl text-charcoal-800 group-hover:text-forest-600 transition-colors">
                  The Nordic Deli
                </span>
                <span className="font-body text-xs text-charcoal-600 tracking-widest uppercase">
                  Hope Island
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={clsx(
                    "font-body text-sm transition-colors",
                    pathname === link.href
                      ? "text-forest-600 font-medium"
                      : "text-charcoal-700 hover:text-forest-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Mobile hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/reserve"
                className="hidden lg:inline-flex items-center px-5 py-2.5 bg-forest-600 text-white font-body font-medium text-sm rounded-xl hover:bg-forest-800 transition-colors"
              >
                Reserve a Table
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                className="lg:hidden p-2 rounded-lg hover:bg-mist transition-colors"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6H19M3 11H19M3 16H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
