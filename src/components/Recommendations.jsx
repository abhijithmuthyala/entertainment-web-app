import ImageLoader from "@/components/ImageLoader";
import { API } from "@/constants";
import Link from "next/link";

export function Recommedations({ recommendations }) {
  return (
    <ul
      className={`scroll-container flex gap-x-6 overflow-x-auto overflow-y-hidden supports-[animation-timeline]:gap-x-2`}
    >
      {recommendations.map(function renderRecommendation(data) {
        return (
          <li
            key={data.id}
            className="grid w-full max-w-[6rem] shrink-0 sm:max-w-[10rem]"
          >
            <Recommendation data={data} />
          </li>
        );
      })}
    </ul>
  );
}

export function Recommendation({ data }) {
  return (
    <Link href={`/${data.type ?? data.media_type}/${data.id}`} className="pb-2">
      <article className="grid gap-y-4">
        <h3 className="text-balance text-center">{data.name ?? data.title}</h3>
        <div className="clip-hexagon -order-1">
          <ImageLoader
            src={`${API.image(data.poster_path)}`}
            alt=""
            width={256}
            height={384}
            priority="low"
            className="w-full object-cover object-center"
          />
        </div>
      </article>
    </Link>
  );
}

export function RecommedationsSection({ children }) {
  return (
    <section className="overflow-hidden px-4">
      <h2 className="mb-2 text-lg font-semibold">You may also like</h2>
      {children}
    </section>
  );
}
