import fs from "fs";
import path from "path";
import Link from "next/link";
import yaml from "js-yaml";

type PostFrontMatter = {
  title?: string;
  date?: string;
  description?: string;
};

type PostMeta = {
  slug: string;
  title: string;
  date?: Date;
  description?: string;
};

export default function Blog() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");

    // Extract YAML frontmatter
    const match = source.match(/---\s*([\s\S]*?)\s*---/);
    let frontmatter: PostFrontMatter = {};

    if (match) {
      try {
        frontmatter = yaml.load(match[1]) as PostFrontMatter;
      } catch (err) {
        console.error(`Error parsing frontmatter in ${filename}:`, err);
      }
    }

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: frontmatter.title ?? filename.replace(/\.mdx$/, ""),
      date: frontmatter.date ? new Date(frontmatter.date) : undefined,
      description: frontmatter.description ?? "",
    };
  });

  // Sort by date descending (undefined dates go last)
  posts.sort((a, b) =>
    a.date && b.date ? b.date.getTime() - a.date.getTime() : a.date ? -1 : 1
  );

  return (
    <div className="prose p-4">
      <h1 className="mb-4">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <div className="flex flex-col">
              <Link href={`/blog/${post.slug}`} className="hover:bg-[orange]">
                {post.title}
              </Link>
              {post.date && (
                <span className="text-[#6d6d6d] text-sm italic">
                  {post.date.toLocaleDateString("en-NZ", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.description && (
                <span className="text-[#6d6d6d] text-sm italic">
                  {post.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
