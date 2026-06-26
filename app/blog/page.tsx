import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import BlogPostCard from "@/components/BlogPostCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // Feeds into root layout template → "Blog | Siddharth Pundir" in the browser tab
  title: "Blog",
  description:
    "Articles on AI, web development, career growth, projects, and building in public by Siddharth Pundir.",
  alternates: { canonical: "/blog" },
  openGraph: {
    // OG titles bypass the template — set the full string explicitly
    title: `Blog | ${SITE_NAME}`,
    description:
      "Articles on AI, web development, career growth, projects, and building in public by Siddharth Pundir.",
    url: "/blog",
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/assets/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Articles on AI, web development, career growth, projects, and building in public by Siddharth Pundir.",
    images: [`${SITE_URL}/assets/og-image.png`],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog`,
      name: `${SITE_NAME} — Blog`,
      description:
        "Articles on AI, web development, career growth, projects, and building in public.",
      url: `${SITE_URL}/blog`,
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
      },
      inLanguage: "en-US",
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
      ],
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <section className="blog-index-section">
          <div className="blog-index-hero">
            <Link href="/" className="blog-back-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5M11 5l-7 7 7 7" />
              </svg>
              Back to portfolio
            </Link>
            <div className="blog-index-hero-text">
              <p className="eyebrow">Blog</p>
              <h1 className="blog-index-heading">Writing &amp; Thinking</h1>
              <p className="blog-index-subtitle">
                Notes on AI, web development, career growth, and building in public.
              </p>
            </div>
          </div>

          <div className="blog-index-content">
            {posts.length > 0 ? (
              <div className="blog-index-grid">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="blog-empty">No posts yet — check back soon.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
