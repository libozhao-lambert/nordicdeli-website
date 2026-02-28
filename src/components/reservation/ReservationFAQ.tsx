const FAQ_ITEMS = [
  {
    q: "Do you take walk-ins?",
    a: "Yes, walk-ins are always welcome! However, we highly recommend reserving a table in advance, especially on weekends.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice if you need to cancel. Use the link in your confirmation email to cancel online, or call us directly.",
  },
  {
    q: "What about large groups?",
    a: "For groups of 8 or more, please call us so we can arrange the best experience for your party. A minimum spend may apply.",
  },
  {
    q: "What if I'm running late?",
    a: "We hold reserved tables for up to 15 minutes. If you know you'll be late, please call us so we can make arrangements.",
  },
];

export function ReservationFAQ() {
  return (
    <section
      className="mt-16 max-w-2xl mx-auto"
      aria-labelledby="res-faq-heading"
    >
      <h2
        id="res-faq-heading"
        className="font-display text-2xl text-charcoal-800 mb-6"
      >
        Reservation FAQs
      </h2>
      <ul className="space-y-4">
        {FAQ_ITEMS.map((item, i) => (
          <li key={i} className="bg-white rounded-2xl p-5 shadow-hygge-sm border border-mist">
            <p className="font-medium text-charcoal-800 mb-1">{item.q}</p>
            <p className="text-sm text-charcoal-600 leading-relaxed">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
