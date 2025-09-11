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
    <div className="p-4 max-w-3/4">
      <article>
        <div className="mb-5">
          <h1 className="text-xl font-semibold">{title}</h1>
        <time>{formatted}</time>
        </div>
        {children}
      </article>
    </div>
  )
}
