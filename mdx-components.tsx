import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

/**
 * Global MDX component overrides.
 * Required by @next/mdx when using the App Router.
 * See: https://nextjs.org/docs/app/guides/mdx#add-an-mdx-componentstsx-file
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Replace <img> with next/image for automatic optimisation.
    // We use unoptimized here so that public-folder blog screenshots don't
    // require explicit width/height dimensions in MDX source.
    img: ({ src, alt, ...rest }) => (
      <Image
        src={src as string}
        alt={alt ?? ""}
        width={800}
        height={600}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        {...rest}
      />
    ),
    // Replace <a> with next/link for internal paths; external links open in new tab
    a: ({ href, children, ...rest }) => {
      if (href?.startsWith("/") || href?.startsWith("#")) {
        return (
          <Link href={href} {...rest}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    },
    // figure/figcaption for screenshot captions
    figure: ({ children, ...rest }) => (
      <figure className="prose-figure" {...rest}>
        {children}
      </figure>
    ),
    figcaption: ({ children, ...rest }) => (
      <figcaption className="prose-figcaption" {...rest}>
        {children}
      </figcaption>
    ),
    // Spread any per-page component overrides last
    ...components,
  };
}
