import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrap all MDX content in the nordic prose wrapper
    wrapper: ({ children }) => (
      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="prose-nordic">{children}</article>
        </div>
      </div>
    ),
    h1: ({ children }) => (
      <h1 className="font-display text-display-md text-charcoal-800 mb-6 mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-display-sm text-charcoal-800 mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl text-charcoal-800 mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-charcoal-600 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-forest-600 underline underline-offset-2 hover:text-forest-800 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-charcoal-600">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-charcoal-600">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="border-mist my-10" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-charcoal-700">{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-forest-600 pl-4 my-6 text-charcoal-600 italic">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
