// PostLayout.tsx
type Props = {
  title: string
  date: Date | string
  children: React.ReactNode
}

export default function PostLayout({ title, date, children }: Props) {
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
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </article>
    </div>
  )
}
