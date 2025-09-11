import fs from "fs";
import path from "path";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  rawDate?: Date;
};

type BookMeta = {
  slug: string;
  title: string;
  dateRead?: string;
  rawDateRead?: Date;
};

function getMostRecentPost(): PostMeta | undefined {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");

    const match = source.match(/---\s*([\s\S]*?)\s*---/);
    const frontmatter: Record<string, string> = {};
    if (match) {
      const fmLines = match[1].split("\n").filter(Boolean);
      fmLines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim();
      });
    }

    const rawDate = frontmatter.date ? new Date(frontmatter.date) : undefined;

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: frontmatter.title || filename.replace(/\.mdx$/, ""),
      date: rawDate
        ? rawDate.toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : undefined,
      rawDate,
    };
  });

  posts.sort((a, b) =>
    a.rawDate && b.rawDate ? b.rawDate.getTime() - a.rawDate.getTime() : 0
  );

  return posts[0];
}

function getLastBookRead(): BookMeta | undefined {
  const booksDir = path.join(process.cwd(), "books");
  if (!fs.existsSync(booksDir)) return undefined;

  const filenames = fs
    .readdirSync(booksDir)
    .filter((f) => f.endsWith(".mdx"));

  const books: BookMeta[] = filenames.map((filename) => {
    const filePath = path.join(booksDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");

    const match = source.match(/---\s*([\s\S]*?)\s*---/);
    const frontmatter: Record<string, string> = {};
    if (match) {
      const fmLines = match[1].split("\n").filter(Boolean);
      fmLines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim();
      });
    }

    const rawDateRead = frontmatter.date_read
      ? new Date(frontmatter.date_read)
      : undefined;

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: frontmatter.title || filename.replace(/\.mdx$/, ""),
      dateRead: rawDateRead
        ? rawDateRead.toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : undefined,
      rawDateRead,
    };
  });

  books.sort((a, b) =>
    a.rawDateRead && b.rawDateRead
      ? b.rawDateRead.getTime() - a.rawDateRead.getTime()
      : 0
  );

  return books[0];
}

export default function Home() {
  const mostRecentPost = getMostRecentPost();
  const lastBookRead = getLastBookRead();

  return (
    <div className="p-4 space-y-8">
      {mostRecentPost && (
        <div className="flex flex-col">
          <h1>Recent Post</h1>
          {mostRecentPost.date && (
            <span className="text-[#6d6d6d] text-sm">
              {mostRecentPost.date}
            </span>
          )}
          <Link
            href={`/blog/${mostRecentPost.slug}`}
            className="no-underline hover:bg-[orange]"
          >
            {mostRecentPost.title}
          </Link>
        </div>
      )}

      {lastBookRead && (
        <div className="flex flex-col">
          <h1>Last Book Read</h1>
          {lastBookRead.dateRead && (
            <span className="text-[#6d6d6d] text-sm">
              {lastBookRead.dateRead}
            </span>
          )}
          <Link
            href={`/books/${lastBookRead.slug}`}
            className="no-underline hover:bg-[orange]"
          >
            {lastBookRead.title}
          </Link>
        </div>
      )}
    </div>
  );
}
