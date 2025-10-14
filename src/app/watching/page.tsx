import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Script from "next/script";

type WatchingFrontmatter = {
  title: string;
  director?: string;
  year_released?: string;
  date_watched?: string;
  rating?: number;
};

type ReadingItem = {
  slug: string;
  frontmatter: WatchingFrontmatter;
  content: string;
};

export default function Reading() {
  const dir = path.join(process.cwd(), "film&tv");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const readings: ReadingItem[] = files.map((file) => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter: WatchingFrontmatter = {
      title: data.title ?? file.replace(/\.mdx$/, ""),
      director: data.director,
      year_released: data.year_released,
      date_watched: data.date_watched,
      rating: data.rating,
    };

    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter,
      content: content.trim(),
    };
  });

  // Sort by date_watched descending
  readings.sort((a, b) => {
    const parseDate = (d?: string) => {
      if (!d) return new Date(0);
      if (/^\d{4}$/.test(d)) return new Date(`${d}-01-01`);
      return new Date(d.replace(/\//g, "-"));
    };
    return parseDate(b.frontmatter.date_watched).getTime() - parseDate(a.frontmatter.date_watched).getTime();
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
      <h1 className="mb-4">What I&apos;ve Been Watching Recently</h1>
      <ul className="space-y-4">
        {readings.map((item) => (
          <li key={item.slug} className="group border-l-2 ps-2 hover:bg-[darkorange]">
            {item.content.length > 0 ? (
              <Link href={`/watching/${item.slug}`} className="block w-full h-full">
                {item.frontmatter.title}
                {item.frontmatter.year_released && ` (${item.frontmatter.year_released})`}
              </Link>
            ) : (
              <span>
                {item.frontmatter.title}
                {item.frontmatter.year_released && ` (${item.frontmatter.year_released})`}
                
              </span>
            )}
            
            <div className="text-[#6d6d6d] text-sm italic">
                {item.frontmatter.rating && `Rating: ${item.frontmatter.rating}/10`}
                {item.frontmatter.date_watched && ` | Watched ${formatDateLE(item.frontmatter.date_watched)}`}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
