import fs from "fs";
import path from "path";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  date?: string;
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
    const frontmatter: Record<string, string> = {};

    if (match) {
      const fmLines = match[1].split("\n").filter(Boolean);
      fmLines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim();
      });
    }

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: frontmatter.title || filename.replace(/\.mdx$/, ""),
      date: frontmatter.date
        ? new Date(frontmatter.date).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : undefined,

    };
  });

  // Sort by date descending (undefined dates go last)
  posts.sort((a, b) =>
    a.date && b.date ? b.date.localeCompare(a.date) : a.date ? -1 : 1
  );

  return (
    <div className="prose p-4">
      <h1 className="mb-4">Blog</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}{" "}
              {post.date && (
                <span className="text-[red]">({post.date})</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
