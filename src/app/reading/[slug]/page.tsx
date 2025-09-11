// src/app/reading/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc"; // for app router, use RSC

type Props = {
  params: { slug: string };
};

export default async function ReadingPost({ params }: Props) {
  const filePath = path.join(process.cwd(), "books", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return (
    <div className="prose p-4 max-w-3/4">
      <h1>{data.title}</h1>
      {data.author && <p><strong>Author:</strong> {data.author}</p>}
      {data.year_published && <p><strong>Year Published:</strong> {data.year_published}</p>}
      {data.date_read && <p><strong>Date Read:</strong> {data.date_read}</p>}
      {data.rating && <p><strong>Rating:</strong> {data.rating}/10</p>}
      
      {/* Render MDX content */}
      <MDXRemote source={content} />
    </div>
  );
}
