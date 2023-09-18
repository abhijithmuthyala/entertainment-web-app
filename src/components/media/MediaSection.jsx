export default function MediaSection({ heading, children }) {
  return (
    <section>
      <h2 className="my-4 text-lg tracking-tight">
        {heading.replace(heading[0], heading[0].toUpperCase())}
      </h2>
      {children}
    </section>
  );
}
