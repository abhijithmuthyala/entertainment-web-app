import FeedbackMessage from "./FeedbackMessage";
import MediaSectionGrid from "./media/MediaSectionGrid";

export default function SearchResults({ data }) {
  if (data.length === 0) {
    return <FeedbackMessage message="No results found." />;
  }

  return <MediaSectionGrid heading={"Search results"} mediaData={data} />;
}
