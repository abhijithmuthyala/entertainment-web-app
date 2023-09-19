import MediaLink from "./MediaLink";

export default function MediaLinksList({
  horizontallyScrollable = false,
  overlayInfo = false,
  data,
}) {
  const Layout = horizontallyScrollable ? CardsScrollWrapper : CardsGridWrapper;

  return (
    <Layout>
      {data.map((mediaData) => (
        <MediaLink
          key={mediaData.id}
          data={mediaData}
          overlayInfo={overlayInfo}
        />
      ))}
    </Layout>
  );
}

export function CardsGridWrapper({ children }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(10.25rem,1fr))] justify-around gap-x-4 gap-y-8 md:grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))]">
      {children}
    </ol>
  );
}

function CardsScrollWrapper({ children }) {
  return (
    <ol className="grid grid-cols-scroll-mobile gap-x-4 overflow-x-auto md:grid-cols-scroll-desktop">
      {children}
    </ol>
  );
}
