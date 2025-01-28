import ImageLoader from "@/components/ImageLoader";
import { API } from "@/constants";

export function MediaCastList({ cast }) {
  return (
    <ul className="scroll-container flex gap-x-6 overflow-x-auto overflow-y-hidden supports-[animation-timeline]:gap-x-2">
      {cast.map(function renderCast(data) {
        return (
          <li key={data.id} className="grid shrink-0 basis-16 sm:basis-20">
            <MediaCast data={data} />
          </li>
        );
      })}
    </ul>
  );
}

export function MediaCast({ data }) {
  return (
    <article className="flex flex-col gap-y-4 overflow-hidden rounded-md pb-2">
      <h3 className="text-balance animate-slide-up text-center leading-tight">
        {data.name}
      </h3>
      <div className="clip-hexagon -order-1 rotate-45 animate-scale-in border-2 border-amber-300">
        <ImageLoader
          src={API.image(data.profile_path)}
          alt=""
          width={500}
          height={750}
          className="object-cover object-center"
        />
      </div>
    </article>
  );
}
