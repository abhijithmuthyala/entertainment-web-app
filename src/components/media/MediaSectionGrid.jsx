import MediaLinksList from "./MediaLinksList";
import MediaSection from "./MediaSection";

export default function MediaSectionGrid({ heading, tag = null, mediaData }) {
  return (
    <div className="py-2 max-lg:px-4">
      <MediaSection heading={heading} tag={tag}>
        <MediaLinksList
          horizontallyScrollable={false}
          overlayInfo={false}
          data={mediaData}
        />
      </MediaSection>
    </div>
  );
}
