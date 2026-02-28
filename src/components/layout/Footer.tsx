import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAP = {
  name: "The Nordic Deli",
  address: "Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212, Australia",
  phone: "+61 420 960 821",
  email: "admin@thenordicdeli.com",
  hours: "Daily · 6:30am – 2:30pm",
};

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/reserve", label: "Reserve a Table" },
  { href: "/events", label: "Events & Classes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-charcoal-800 text-cream-100"
      aria-label="Site footer"
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + NAP */}
        <div>
          <Link href="/" className="group inline-flex items-center gap-3 mb-4">
            <Image
              src="/images/logo/logo-circle.svg"
              alt=""
              width={44}
              height={44}
              className="shrink-0"
              aria-hidden="true"
            />
            <span className="font-display text-2xl text-white group-hover:text-birch-400 transition-colors">
              The Nordic Deli
            </span>
          </Link>
          <p className="text-sm text-cream-200/70 font-body leading-relaxed max-w-xs">
            Nordic Hygge and handcrafted pastries in the heart of Hope Island,
            Gold Coast.
          </p>

          {/* NAP structured data */}
          <address
            className="not-italic mt-6 space-y-2 text-sm text-cream-200/80 font-body"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content={NAP.name} />
            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="streetAddress" content="Shop 15/10 Santa Barbara Rd" />
              <meta itemProp="addressLocality" content="Hope Island" />
              <meta itemProp="addressRegion" content="QLD" />
              <meta itemProp="postalCode" content="4212" />
              <meta itemProp="addressCountry" content="AU" />
              <span>{NAP.address}</span>
            </p>
            <p>
              <a
                href={`tel:${NAP.phone.replace(/\s/g, "")}`}
                itemProp="telephone"
                className="hover:text-birch-400 transition-colors"
              >
                {NAP.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${NAP.email}`}
                itemProp="email"
                className="hover:text-birch-400 transition-colors"
              >
                {NAP.email}
              </a>
            </p>
            <p>
              <meta itemProp="openingHours" content="Mo-Su 06:30-14:30" />
              <span className="text-birch-400">⏱</span> {NAP.hours}
            </p>
          </address>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/thenordic.deli/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Nordic Deli on Instagram"
              className="text-cream-200/60 hover:text-birch-400 transition-colors duration-200"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/p/The-Nordic-Deli-61556914721844/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Nordic Deli on Facebook"
              className="text-cream-200/60 hover:text-birch-400 transition-colors duration-200"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div>
          <h3 className="font-display text-lg text-white mb-4">Explore</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-body text-cream-200/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reserve + hours */}
        <div>
          <h3 className="font-display text-lg text-white mb-4">Visit Us</h3>
          <div className="bg-charcoal-700 rounded-2xl p-5 mb-5">
            <p className="text-sm font-body text-cream-200/80 mb-1">
              Open Daily
            </p>
            <p className="font-display text-xl text-birch-400">
              6:30am – 2:30pm
            </p>
          </div>
          <Button href="/reserve" variant="primary">
            Reserve a Table →
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-200/50 font-body">
            © {year} The Nordic Deli. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-body text-cream-200/50 hover:text-cream-200/80 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
