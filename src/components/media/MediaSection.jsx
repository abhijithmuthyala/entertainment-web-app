export default function MediaSection({ heading, tag = null, children }) {
  return (
    <section className="">
      <h2 className="mb-4 flex items-center gap-x-4 text-lg tracking-tight">
        {heading.replace(heading[0], heading[0].toUpperCase())}
        {tag && (
          <span className="text-xs rounded-md border-1 border-highlight p-1 -tracking-tighter opacity-75">
            {tag.toUpperCase()}
          </span>
        )}
      </h2>
      {children}
    </section>
  );
}
