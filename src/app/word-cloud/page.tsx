import fs from "fs";
import path from "path";
import WordCloud from "@/components/WordCloud";

export default function WordCloudPage() {
  // Get all words from posts
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))
    : [];
  
  let allText = "";
  filenames.forEach((filename) => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const content = source.replace(/---[\s\S]*?---/, ""); // remove frontmatter
    allText += " " + content;
  });

  // Clean text and split into words
  const words = allText
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  return <WordCloud words={words} />;
}
