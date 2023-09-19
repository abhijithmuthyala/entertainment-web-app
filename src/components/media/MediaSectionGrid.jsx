import MediaLinksList from "./MediaLinksList";
import MediaSection from "./MediaSection";

export default function MediaSectionGrid({ heading, tag = null, mediaData }) {
  return (
    <div className="px-4 py-6">
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
