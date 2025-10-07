import fs from "fs";
import path from "path";
import WordCloud from "@/components/WordCloud";

export default function WordCloudPage() {
  const allDirs = ["posts", "books"];
  let allText = "";

  allDirs.forEach((dirName) => {
    const dirPath = path.join(process.cwd(), dirName);
    if (!fs.existsSync(dirPath)) return;

    const filenames = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    filenames.forEach((filename) => {
      const filePath = path.join(dirPath, filename);
      const source = fs.readFileSync(filePath, "utf-8");
      const content = source.replace(/---[\s\S]*?---/, ""); // remove frontmatter
      allText += " " + content;
    });
  });

  const words = allText
  .replace(/[^a-zA-Z0-9\s-]/g, "")
  .split(/[\s-]+/)
  .filter(Boolean)
  .filter((word) => word.length <= 25);

  return (
    <div className="p-4 w-full">
      <h1 className="mb-4">A Collection of Words From My Posts</h1>
      <span>Rearrange my thoughts to create new sentences</span>
      <WordCloud words={words} />
    </div>
  
  );
}
