import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedMenu } from "@/components/sections/FeaturedMenu";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { OurStoryTeaser } from "@/components/sections/OurStoryTeaser";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { FindUs } from "@/components/sections/FindUs";

export const metadata: Metadata = {
  title: "The Nordic Deli | Café & Bakery · Hope Island, Gold Coast",
  description:
    "Nordic-inspired café and deli on Hope Island, Gold Coast. Freshly made Scandinavian pastries, eggs your way, and Hygge-style dining. Open daily 6:30am–2:30pm.",
  openGraph: {
    title: "The Nordic Deli | Nordic Café & Bakery · Hope Island",
    description:
      "Experience Nordic Hygge at Hope Island. Handcrafted Scandinavian pastries, breakfast, and brunch. Reserve a table today.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedMenu />
      <UpcomingEvents />
      <OurStoryTeaser />
      <GalleryPreview />
      <FindUs />
    </>
  );
}
