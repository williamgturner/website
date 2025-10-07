// PostLayout.tsx
type Props = {
  title: string
  date: Date | string
  children: React.ReactNode
  tags?: string[]
}

export default function PostLayout({ title, date, children, tags }: Props) {
  const formatted =
    date instanceof Date
      ? date.toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })
      : date

  return (
    <div className="p-4 md:max-w-3/4">
      <article className="pb-4">
        <div className="mb-5">
          <h1 className="text-xl font-semibold">{title}</h1>
          <time>{formatted}</time>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-gray-800 pe-2 py-0.5 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </article>
    </div>
  )
}
