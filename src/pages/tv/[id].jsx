import MediaBanner from "@/components/media/MediaBanner";
import { MediaCastList } from "@/components/media/MediaCast";
import MediaCastSection from "@/components/media/MediaCastSection";
import {
  Recommedations,
  RecommedationsSection,
} from "@/components/Recommendations";
import { API } from "@/constants";
import { fetchData } from "@/utils";

export default function TVDetailsPage({
  id,
  details,
  images,
  cast,
  recommendations,
}) {
  return (
    <main className="grid gap-y-12">
      <MediaBanner details={details} images={images} />
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
    const [details, images, credits, { results: recommendations }] =
      await Promise.all([
        fetchData(API.details("tv", id), options),
        fetchData(API.images("tv", id), options),
        fetchData(API.credits("tv", id), options),
        fetchData(API.recommendations("tv", id), options),
      ]);
    delete images.logos;

    return {
      props: {
        id,
        details,
        images,
        cast: credits.cast,
        recommendations,
        videos,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
