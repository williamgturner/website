// src/app/reading/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc"; // for app router, use RSC

type Props = {
  params: { slug: string };
};

export default async function WatchingPost({ params }: Props) {
  const filePath = path.join(process.cwd(), "film&tv", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return (
    <div className="prose p-4 md:max-w-3/4">
      <div className="mb-4">
        <h1 className="mb-4">{data.title}</h1>
        {data.director && <p><strong>Director:</strong> {data.director}</p>}
        {data.year_released && <p><strong>Year Released:</strong> {data.year_released}</p>}
        {data.date_watched && <p><strong>Date Watched:</strong> {data.date_watched}</p>}
        {data.rating && <p><strong>Rating:</strong> {data.rating}/10</p>}
      </div>

      {/* Render MDX content */}
      <MDXRemote source={content} />
    </div>
  );
}
