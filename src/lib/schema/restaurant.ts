export function buildRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "The Nordic Deli",
    description:
      "Nordic-inspired café and deli serving Scandinavian pastries, eggs your way, and Hygge-style dining in Hope Island, Gold Coast, Australia.",
    url: "https://nordicdeli.anchornetwork.ai",
    telephone: "+61420960821",
    email: "admin@thenordicdeli.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop 15/10 Santa Barbara Rd",
      addressLocality: "Hope Island",
      addressRegion: "QLD",
      postalCode: "4212",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.8613,
      longitude: 153.3721,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:30",
      closes: "14:30",
    },
    servesCuisine: ["Nordic", "Scandinavian", "Café", "Bakery"],
    priceRange: "$$",
    currenciesAccepted: "AUD",
    image: "https://nordicdeli.anchornetwork.ai/images/og/default.jpg",
    hasMenu: "https://nordicdeli.anchornetwork.ai/menu",
    acceptsReservations: "True",
    reservationAction: {
      "@type": "ReserveAction",
      target: "https://nordicdeli.anchornetwork.ai/reserve",
    },
  };
}
