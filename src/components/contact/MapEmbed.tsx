export function MapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-mist shadow-hygge-sm aspect-[4/3] w-full">
      <iframe
        title="The Nordic Deli on Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.8!2d153.3721!3d-27.8613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShop+15%2F10+Santa+Barbara+Rd%2C+Hope+Island+QLD+4212!5e0!3m2!1sen!2sau!4v1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Map showing The Nordic Deli at Shop 15/10 Santa Barbara Rd, Hope Island QLD 4212"
      />
    </div>
  );
}
