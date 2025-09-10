import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const mdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default mdx(nextConfig);
