// src/components/MDXRenderer.tsx
"use client"; // MDX may use React hooks

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  mdxSource: MDXRemoteSerializeResult;
};

export default function MDXRenderer({ mdxSource }: Props) {
  return <MDXRemote {...mdxSource} />;
}
