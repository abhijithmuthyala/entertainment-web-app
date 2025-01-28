import MediaBanner from "@/components/media/MediaBanner";
import { MediaCastList } from "@/components/media/MediaCast";
import MediaCastSection from "@/components/media/MediaCastSection";
import {
  Recommedations,
  RecommedationsSection,
} from "@/components/Recommendations";
import { API } from "@/constants";
import { fetchData } from "@/utils";

export default function MovieDetailsPage({ details, cast, recommendations }) {
  return (
    <main className="grid gap-y-12">
      <MediaBanner details={details} />
      <MediaCastSection>
        <MediaCastList cast={cast} />
      </MediaCastSection>
      <RecommedationsSection recommendations={recommendations}>
        <Recommedations recommendations={recommendations} />
      </RecommedationsSection>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.KEY}`,
    },
  };
  try {
    const [details, credits, { results: recommendations }] = await Promise.all([
      fetchData(API.details("movie", id), options),
      fetchData(API.credits("movie", id), options),
      fetchData(API.recommendations("movie", id), options),
    ]);

    return {
      props: { id, details, cast: credits.cast, recommendations },
    };
  } catch (error) {
    console.error(error);
  }
}
