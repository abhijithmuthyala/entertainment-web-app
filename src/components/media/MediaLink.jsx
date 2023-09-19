import Image from "next/image";
import Link from "next/link";

import { API } from "@/constants";
import { formatData } from "@/utils";

const mediaIconNames = {
  movie: "movies",
  tv: "tv-series",
};

export default function MediaLink({ data, overlayInfo = false }) {
  const formattedData = formatData(data);
  const releaseYear = new Date(
    formattedData.releaseDate || formattedData.firstAirDate,
  ).getFullYear();

  const overlayedClasses = overlayInfo
    ? "absolute z-10 block w-full p-4 bottom-0"
    : "";

  return (
    <li className="group relative overflow-hidden  transition-all">
      <Link href={"/"} className="flex flex-col-reverse gap-y-2">
        <div
          className={"flex flex-col-reverse gap-y-1" + " " + overlayedClasses}
        >
          <h3 className="font-bold">
            {formattedData.title || formattedData.name}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <p className="">{releaseYear}</p>
            <p className="flex items-center gap-2 align-bottom">
              <Image
                src={`/icon-nav-${mediaIconNames[formattedData.mediaType]}.svg`}
                alt=""
                role="presentation"
                width={12}
                height={12}
                className="inline-block aspect-square w-3 object-cover object-center align-middle brightness-[100]"
              />
              {formattedData.mediaType.replace(
                formattedData.mediaType[0],
                formattedData.mediaType[0].toUpperCase(),
              )}
            </p>
          </div>
        </div>
        <Image
          src={API.image(formattedData.backdropPath)}
          alt=""
          role="presentation"
          width={470}
          height={140}
          loading="lazy"
          className="aspect-[240/140] w-full rounded-lg object-cover brightness-75 transition-all duration-200 group-hover:scale-110"
        />
      </Link>
    </li>
  );
}
