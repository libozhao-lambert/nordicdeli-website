"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus to close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let CSS transition start
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-charcoal-800/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={clsx(
          "fixed top-0 right-0 h-full w-72 bg-cream z-50 shadow-hygge-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-mist">
          <span className="font-display text-xl text-charcoal-800">Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav>
          <ul className="p-6 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={clsx(
                    "block py-3 px-4 font-body rounded-xl transition-colors text-base",
                    pathname === link.href
                      ? "text-forest-600 font-medium bg-forest-600/5"
                      : "text-charcoal-700 hover:text-forest-600 hover:bg-mist"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6 pt-2">
            <Link
              href="/reserve"
              onClick={onClose}
              className="block w-full text-center py-3 px-4 bg-forest-600 text-white font-medium rounded-xl hover:bg-forest-800 transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
