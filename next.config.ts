import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow .md and .mdx files to be imported as modules
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  turbopack: {
    root: process.cwd(),
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names as strings, not imported functions.
    // remark-frontmatter strips YAML/TOML front-matter from the rendered output
    // (gray-matter handles parsing it for metadata separately).
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
