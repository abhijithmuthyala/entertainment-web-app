import MediaLink from "./MediaLink";

import { EAGER_LOAD_UNITS } from "@/constants";

export default function MediaLinksList({
  horizontallyScrollable = false,
  overlayInfo = false,
  data,
}) {
  const Layout = horizontallyScrollable ? CardsScrollWrapper : CardsGridWrapper;

  return (
    <Layout>
      {data.map((mediaData, index) => (
        <MediaLink
          key={mediaData.id}
          data={mediaData}
          overlayInfo={overlayInfo}
          priority={index === 0}
          shouldLoadEagerly={index < EAGER_LOAD_UNITS}
        />
      ))}
    </Layout>
  );
}

export function CardsGridWrapper({ children }) {
  return (
    <ol className="scroll-container-vertical grid grid-cols-[repeat(auto-fill,minmax(10.25rem,1fr))] justify-around gap-x-4 gap-y-8 md:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] md:gap-10">
      {children}
    </ol>
  );
}

export function CardsScrollWrapper({ children }) {
  return (
    <ol className="scroll-container grid grid-cols-scroll-mobile gap-x-4 overflow-x-auto overflow-y-hidden supports-[animation-timeline]:gap-0 md:grid-cols-scroll-desktop">
      {children}
    </ol>
  );
}
