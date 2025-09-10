// src/components/PostLayout.tsx
export default function PostLayout({
  children,
  title,
  date,
}: {
  children: React.ReactNode;
  title?: string;
  date?: string;
}) {
  return (
    <article className="prose mx-auto p-4">
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      {date && <p className="text-gray-500">{date}</p>}
      <div className="mt-4">{children}</div>
    </article>
  );
}
