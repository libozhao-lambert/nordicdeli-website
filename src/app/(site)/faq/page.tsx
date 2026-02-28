import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQSchema } from "@/lib/schema/faq";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about The Nordic Deli — reservations, opening hours, dietary requirements, large group bookings, and more.",
  openGraph: {
    title: "FAQ | The Nordic Deli",
    description:
      "Everything you need to know about visiting The Nordic Deli at Hope Island.",
  },
  alternates: { canonical: "/faq" },
};

const FAQ_ITEMS = [
  {
    question: "What is Hygge?",
    answer:
      "Pronounced 'hoo-ga', Hygge is a Scandinavian concept that embodies cosiness, comfort, and the simple joy of being present. It's the warmth of shared coffee, the pleasure of handmade food, and the feeling of belonging. At The Nordic Deli, Hygge is our guiding philosophy.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open daily from 6:30am to 2:30pm, including weekends and most public holidays. Last coffee orders are at 2:00pm. We may have reduced hours on Christmas Day and New Year's Day — please check our social media for holiday updates.",
  },
  {
    question: "Do you take walk-ins or is a reservation required?",
    answer:
      "Walk-ins are always welcome! However, we recommend making a reservation, especially on weekends and public holidays, to ensure we can accommodate your group. You can reserve a table online through our website or call us directly.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours notice if you need to cancel or modify your reservation. This allows us to offer your table to other guests. To cancel, use the link in your confirmation email or contact us directly.",
  },
  {
    question: "Can you accommodate large groups?",
    answer:
      "We love hosting groups! For parties of 8 or more, please call us in advance so we can arrange the best seating and give your group the attention it deserves. For very large groups (15+), a minimum spend or pre-set menu may apply.",
  },
  {
    question: "Do you cater for dietary requirements?",
    answer:
      "Yes! Our menu features many vegetarian, vegan, gluten-free, and dairy-free options — look for the VG, V, GF, GFO, and DF tags on our menu. Our kitchen handles allergens including nuts, gluten, dairy, and eggs, so please always inform our staff of any severe allergies so we can take appropriate care.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, free parking is available in the Hope Island Shopping Village car park. Accessible parking spaces are also available close to the entrance.",
  },
  {
    question: "Do you offer gift vouchers?",
    answer:
      "We do! Gift vouchers make a wonderful present for lovers of good food and Nordic warmth. Please contact us via email at admin@thenordicdeli.com or visit us in store to purchase a voucher.",
  },
  {
    question: "Can I host a private event at The Nordic Deli?",
    answer:
      "Absolutely. We host private functions, corporate breakfasts, birthday celebrations, and bespoke Nordic dining experiences. Contact us via our Contact page to discuss your vision and we will tailor an experience just for you.",
  },
  {
    question: "Do you offer takeaway?",
    answer:
      "Yes! All items on our menu are available for takeaway. Our pastries, coffee, and café items travel beautifully. Simply ask our team when you order.",
  },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQ_ITEMS)} />

      {/* Hero */}
      <section className="bg-forest-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-birch-400 text-sm tracking-widest uppercase mb-3">
            Need Help?
          </p>
          <h1 className="font-display text-display-lg text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-cream-200 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about visiting The Nordic Deli.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Accordion items={FAQ_ITEMS} />

          {/* Still have questions */}
          <div className="mt-16 text-center bg-white rounded-3xl p-10 shadow-hygge">
            <h2 className="font-display text-2xl text-charcoal-800 mb-3">
              Still have a question?
            </h2>
            <p className="text-charcoal-600 mb-6">
              We&apos;re always happy to help. Reach out via our contact form or pop
              in to see us at Hope Island.
            </p>
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
