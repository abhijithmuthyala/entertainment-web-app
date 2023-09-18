import MediaLink from "./MediaLink";

import { HORIZONTAL_SCROLL_UNITS } from "@/constants";

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
  return <ol>{children}</ol>;
}

function CardsScrollWrapper({ children }) {
  return (
    <ol
      className={`grid gap-x-4 overflow-x-auto`}
      style={{
        gridTemplateColumns: `repeat(${HORIZONTAL_SCROLL_UNITS},15rem)`,
      }}
    >
      {children}
    </ol>
  );
}
