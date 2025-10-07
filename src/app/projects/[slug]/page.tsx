import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import MDXRenderer from "@/components/MDXRenderer";
import PostLayout from "@/components/PostLayout";

type Props = { params: { slug: string } };

export default async function ProjectPost({ params }: Props) {
  const filePath = path.join(process.cwd(), "projects", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(source);

  const mdxSource = await serialize(content);

  return (
    <PostLayout title={data.title} date={data.date} tags={data.tags}>
      <MDXRenderer mdxSource={mdxSource} />
    </PostLayout>
  );
}
