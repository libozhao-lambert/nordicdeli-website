interface JsonLdProps {
  data: object;
}

/**
 * Renders a JSON-LD structured data script tag.
 * Sanitizes the JSON to prevent XSS via < characters.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
