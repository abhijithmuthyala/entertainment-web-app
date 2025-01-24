import { API } from "@/constants";
import Image from "next/image";

export function MediaCastList({ cast }) {
  return (
    <ul className="flex gap-x-6 overflow-x-auto">
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
    <article className="flex flex-col gap-y-4 overflow-hidden rounded-md pb-4">
      <h3 className="animate-slide-up text-center leading-tight">
        {data.original_name}
      </h3>
      <Image
        src={API.image(data.profile_path)}
        alt=""
        width={500}
        height={750}
        className="-order-1 rotate-45 animate-scale-in border-2 border-amber-300 object-cover object-center"
      />
    </article>
  );
}
