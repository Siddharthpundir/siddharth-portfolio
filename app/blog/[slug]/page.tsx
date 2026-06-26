import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostNavigation } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Static params — pre-render all known slugs at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Requests for slugs not in generateStaticParams return 404 at the CDN edge
export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Per-post metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = getPostBySlug(slug);
  if (!data) return {};

  const { frontmatter } = data;
  const ogImage = frontmatter.ogImage
    ? `${SITE_URL}${frontmatter.ogImage}`
    : frontmatter.coverImage
      ? `${SITE_URL}${frontmatter.coverImage}`
      : `${SITE_URL}/assets/og-image.png`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: frontmatter.author, url: SITE_URL }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      authors: [frontmatter.author],
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const data = getPostBySlug(slug);
  if (!data) notFound();

  const { frontmatter } = data;
  const { prev, next } = getPostNavigation(slug);

  // Dynamically import the MDX file — Turbopack resolves all slugs at build time
  // via generateStaticParams, so this import is always valid.
  type MDXModule = { default: React.ComponentType<Record<string, unknown>> };
  const { default: PostContent } = (await import(
    `@/content/posts/${slug}.mdx`
  )) as MDXModule;

  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  // JSON-LD: BlogPosting + BreadcrumbList schemas
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${slug}`,
      },
      headline: frontmatter.title,
      description: frontmatter.description,
      datePublished: frontmatter.publishedAt,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: frontmatter.author,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
      },
      url: `${SITE_URL}/blog/${slug}`,
      ...(frontmatter.coverImage && {
        image: `${SITE_URL}${frontmatter.coverImage}`,
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: frontmatter.title,
          item: `${SITE_URL}/blog/${slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <article className="blog-post-article">
          {/* JSON-LD structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />

          {/* Back navigation */}
          <Link href="/blog" className="blog-back-link">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            All posts
          </Link>

          {/* Post header */}
          <header className="blog-post-header">
            <div className="card-meta">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="status-badge">
                  {tag}
                </span>
              ))}
            </div>
            <h1>{frontmatter.title}</h1>
            <div className="blog-post-meta">
              <time dateTime={frontmatter.publishedAt}>{formattedDate}</time>
              {frontmatter.readingTime != null && (
                <span>{frontmatter.readingTime} min read</span>
              )}
              <span>by {frontmatter.author}</span>
            </div>
          </header>

          {/* MDX content */}
          <div className="prose">
            <PostContent />
          </div>

          {/* Post footer */}
          <footer className="blog-post-footer">
            <nav className="blog-post-nav" aria-label="Post navigation">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-nav-link prev">
                  <small>← Previous Post</small>
                  <strong>{prev.title}</strong>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="blog-nav-link next">
                  <small>Next Post →</small>
                  <strong>{next.title}</strong>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
