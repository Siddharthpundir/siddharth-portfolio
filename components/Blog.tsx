import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";
import BlogPostCard from "./BlogPostCard";

export default function Blog() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <aside className="blog-panel" id="blog">
      <div className="panel-header">
        <h2>Latest Blog Posts</h2>
        <Link href="/blog" className="panel-link">
          View all posts →
        </Link>
      </div>
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </aside>
  );
}
