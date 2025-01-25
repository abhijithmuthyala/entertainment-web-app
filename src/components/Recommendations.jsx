import { API } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export function Recommedations({ recommendations }) {
  return (
    <ul className="flex gap-x-6 overflow-x-auto">
      {recommendations.map(function renderRecommendation(data) {
        return (
          <li
            key={data.id}
            className="grid max-w-[6rem] shrink-0 sm:max-w-[10rem]"
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
    <Link
      href={`/${data.type ?? data.media_type}/${data.id}`}
      className="grid pb-4"
    >
      <article className="flex flex-col-reverse justify-end gap-y-4">
        <h3 className="text-balance text-center">{data.name ?? data.title}</h3>
        <div className="clip-hexagon rotate-[25deg] bg-slate-400">
          <Image
            src={`${API.image(data.poster_path)}`}
            alt=""
            width={256}
            height={384}
            className="clip-hexagon scale-[.97] object-cover object-center"
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
