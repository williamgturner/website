import fs from "fs";
import path from "path";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  rawDate?: Date;
  hasContent: boolean;
};

type BookMeta = {
  slug: string;
  title: string;
  dateRead?: string;
  rawDateRead?: Date;
  hasContent: boolean;
};

// Helper to remove surrounding quotes
function cleanTitle(title: string) {
  return title.replace(/^["']|["']$/g, "");
}

function getMostRecentPost(): PostMeta | undefined {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return undefined;

  const filenames = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");

    const match = source.match(/---\s*([\s\S]*?)\s*---/);
    const frontmatter: Record<string, string> = {};
    let body = source;

    if (match) {
      const fmLines = match[1].split("\n").filter(Boolean);
      fmLines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim();
      });
      body = source.slice(match[0].length).trim();
    }

    const rawDate = frontmatter.date ? new Date(frontmatter.date) : undefined;

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: cleanTitle(frontmatter.title || filename.replace(/\.mdx$/, "")),
      date: rawDate
        ? rawDate.toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : undefined,
      rawDate,
      hasContent: body.length > 0,
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
    let body = source;

    if (match) {
      const fmLines = match[1].split("\n").filter(Boolean);
      fmLines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim();
      });
      body = source.slice(match[0].length).trim();
    }

    const rawDateRead = frontmatter.date_read
      ? new Date(frontmatter.date_read)
      : undefined;

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: cleanTitle(frontmatter.title || filename.replace(/\.mdx$/, "")),
      dateRead: rawDateRead
        ? rawDateRead.toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : undefined,
      rawDateRead,
      hasContent: body.length > 0,
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
    <div className="p-4 space-y-4 ">
      <h1>Home</h1>
        {mostRecentPost && (
          <div className="flex flex-col">
            <h1>Recent Post</h1>
            {mostRecentPost.date && (
              <span className="text-[#6d6d6d] text-sm">
                {mostRecentPost.date}
              </span>
            )}
            {mostRecentPost.hasContent ? (
              <Link
                href={`/blog/${mostRecentPost.slug}`}
                className="hover:bg-[orange]"
              >
                {mostRecentPost.title}
              </Link>
            ) : (
              <span>{mostRecentPost.title}</span>
            )}
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
            {lastBookRead.hasContent ? (
              <Link
                href={`/reading/${lastBookRead.slug}`}
                className="hover:bg-[orange]"
              >
                {lastBookRead.title}
              </Link>
            ) : (
              <span>{lastBookRead.title}</span>
            )}
          </div>
        )}
      <div>
        <h1>A Cool Picture I Took</h1>
        <span className="text-[#6d6d6d] text-sm">
                2 March 2022
              </span>
        <img className="w-100" src="/index.jpg" alt="home-page image"></img>
      </div>
    </div>
  );
}
