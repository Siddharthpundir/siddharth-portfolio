import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
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
  const ogImage = frontmatter.coverImage
    ? `${SITE_URL}${frontmatter.coverImage}`
    : `${SITE_URL}/assets/profile-photo.png`;

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

  // JSON-LD: BlogPosting schema for rich search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: frontmatter.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${slug}`,
    ...(frontmatter.coverImage && {
      image: `${SITE_URL}${frontmatter.coverImage}`,
    }),
  };

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
            <Link href="/blog" className="blog-back-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5M11 5l-7 7 7 7" />
              </svg>
              Back to all posts
            </Link>
          </footer>

          {/* Comments section — Giscus placeholder */}
          <section className="blog-comments" aria-label="Comments">
            <div className="blog-comments-inner">
              <h2 className="blog-comments-title">Discussion</h2>
              <div className="blog-comments-placeholder">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="comments-icon">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>Comments coming soon.</p>
                <span>Powered by Giscus — GitHub Discussions</span>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
