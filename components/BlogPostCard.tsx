import Link from "next/link";
import type { Post } from "@/lib/posts";

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-inner">
        <div className="card-meta">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="status-badge">
              {tag}
            </span>
          ))}
          {post.readingTime != null && (
            <span className="progress-dot">{post.readingTime} min read</span>
          )}
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <time className="blog-card-date" dateTime={post.publishedAt}>
          {formattedDate}
        </time>
      </Link>
    </article>
  );
}
