import { titleCase } from "@/utils";

export default function MediaSection({ heading, tag = null, children }) {
  console.log("MediaSection", heading);
  return (
    <section className="">
      <h2 className="mb-4 flex items-center gap-x-4 text-lg tracking-tight">
        {titleCase(heading)}
        {tag && (
          <span className="rounded-md border-1 border-highlight p-1 text-xs -tracking-tighter opacity-75">
            {tag.toUpperCase()}
          </span>
        )}
      </h2>
      {children}
    </section>
  );
}
