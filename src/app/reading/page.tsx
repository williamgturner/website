import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Script from "next/script";

type ReadingFrontmatter = {
  title: string;
  author?: string;
  year_published?: string;
  date_read?: string;
  rating?: number;
};

type ReadingItem = {
  slug: string;
  frontmatter: ReadingFrontmatter;
  content: string;
};

export default function Reading() {
  const dir = path.join(process.cwd(), "books");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const readings: ReadingItem[] = files.map((file) => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter: ReadingFrontmatter = {
      title: data.title ?? file.replace(/\.mdx$/, ""),
      author: data.author,
      year_published: data.year_published,
      date_read: data.date_read,
      rating: data.rating,
    };

    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter,
      content: content.trim(),
    };
  });

  // Sort by date_read descending
  readings.sort((a, b) => {
    const parseDate = (d?: string) => {
      if (!d) return new Date(0);
      if (/^\d{4}$/.test(d)) return new Date(`${d}-01-01`);
      return new Date(d.replace(/\//g, "-"));
    };
    return parseDate(b.frontmatter.date_read).getTime() - parseDate(a.frontmatter.date_read).getTime();
  });

  const formatDateLE = (d?: string) => {
    if (!d) return "";
    if (/^\d{4}$/.test(d)) return d;
    const parts = d.split(/[-\/]/);
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return d;
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">What I&apos;ve Been Reading Recently</h1>
      <ul className="space-y-4">
        {readings.map((item) => (
          <li key={item.slug} className="group hover:bg-[darkorange] border-l-2 ps-2">
            {item.content.length > 0 ? (
              <Link href={`/reading/${item.slug}`} className="block w-full h-full">
                {item.frontmatter.title}
                {item.frontmatter.year_published && ` (${item.frontmatter.year_published})`}
              </Link>
            ) : (
              <span>
                {item.frontmatter.title}
                {item.frontmatter.year_published && ` (${item.frontmatter.year_published})`}
              </span>
            )}
            <div className="text-[#6d6d6d] text-sm italic">
              {item.frontmatter.author && `${item.frontmatter.author}`}
              {item.frontmatter.date_read && ` | Read ${formatDateLE(item.frontmatter.date_read)}`}
              {item.frontmatter.rating && `, rating: ${item.frontmatter.rating}/10`}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4" id="website-bookclub">
        <Script
          src="https://isak.me/onionring/onionring-variables.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://isak.me/onionring/onionring-widget.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}
