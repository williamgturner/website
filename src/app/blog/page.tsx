import fs from "fs";
import path from "path";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  date?: Date;
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
      date: frontmatter.date ? new Date(frontmatter.date) : undefined,
    };
  });

  // Sort by date descending (undefined dates go last)
  posts.sort((a, b) =>
    a.date && b.date ? b.date.getTime() - a.date.getTime() : a.date ? -1 : 1
  );

  return (
    <div className="prose p-4">
      <h1 className="mb-4">Blog</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <div className="flex flex-col">
              {post.date && (
                <span className="text-[#6d6d6d] text-sm">
                  {post.date.toLocaleDateString("en-NZ", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="no-underline hover:bg-[orange]"
              >
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
