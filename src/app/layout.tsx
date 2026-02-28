import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nordicdeli.anchornetwork.ai"
  ),
  title: {
    default: "The Nordic Deli | Café & Bakery · Hope Island, Gold Coast",
    template: "%s | The Nordic Deli",
  },
  description:
    "Nordic-inspired café and deli on Hope Island. Freshly made Scandinavian pastries, eggs your way, and Hygge-style dining. Open daily 6:30am–2:30pm.",
  openGraph: {
    siteName: "The Nordic Deli",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/images/assets/favicon/logo-circle.svg", type: "image/svg+xml" },
      { url: "/images/assets/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/assets/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/images/assets/favicon/apple-touch-icon.png" },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${process.env.CF_WEB_ANALYTICS_TOKEN ?? ""}"}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
