// src/app/blog/[slug]/page.tsx
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import MDXRenderer from "@/components/MDXRenderer";
import PostLayout from "@/components/PostLayout";

type Props = { params: { slug: string } };

export default async function BlogPost({ params }: Props) {
  // 1. Read MDX file
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  // 2. Parse frontmatter
  const { content, data } = matter(source);

  // 3. Serialize MDX content
  const mdxSource = await serialize(content);

  return (
    <PostLayout title={data.title} date={data.date}>
      <MDXRenderer mdxSource={mdxSource} />
    </PostLayout>
  );
}
