import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string; // ISO date string "YYYY-MM-DD"
  author: string;
  tags: string[];
  coverImage?: string; // absolute public path, e.g. "/blog/covers/my-post.jpg"
  ogImage?: string; // custom OG image path, e.g. "/assets/blog/og/my-post.png"
  readingTime?: number; // minutes; auto-calculated if omitted
};

export type Post = PostFrontmatter & {
  slug: string; // derived from filename without .mdx extension
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Estimates reading time at ~200 words per minute, minimum 1 minute. */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns all published posts sorted by publishedAt descending (newest first).
 * Safe to call at build time — reads from the filesystem via Node fs.
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter = data as PostFrontmatter;
    const readingTime =
      frontmatter.readingTime ?? calculateReadingTime(content);

    return { ...frontmatter, readingTime, slug };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Returns the N most recent posts. Used by the homepage Blog section.
 * Defaults to 3.
 */
export function getLatestPosts(n = 3): Post[] {
  return getAllPosts().slice(0, n);
}

/**
 * Returns the frontmatter and raw MDX content string for a single post slug.
 * Returns null if the file does not exist.
 */
export function getPostBySlug(
  slug: string,
): { frontmatter: PostFrontmatter; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as PostFrontmatter;
  if (!frontmatter.readingTime) {
    frontmatter.readingTime = calculateReadingTime(content);
  }

  return { frontmatter, content };
}

/**
 * Returns the previous (older) and next (newer) post for a given slug.
 */
export function getPostNavigation(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  
  if (currentIndex === -1) return { prev: null, next: null };

  // Posts are sorted newest first. 
  // Next (newer) is currentIndex - 1. 
  // Prev (older) is currentIndex + 1.
  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
