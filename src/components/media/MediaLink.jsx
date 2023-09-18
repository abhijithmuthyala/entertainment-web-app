import Image from "next/image";
import Link from "next/link";

import { API } from "@/constants";
import { formatData } from "@/utils";

export default function MediaLink({ data, overlayInfo = false }) {
  const formattedData = formatData(data);
  const releaseYear = new Date(formattedData.releaseDate).getFullYear();

  const overlayedClasses = overlayInfo
    ? "absolute z-10 block w-full p-4 bottom-0"
    : "";

  return (
    <li className="relative overflow-hidden rounded-lg">
      <Link href={"/"} className="">
        <div
          className={"flex flex-col-reverse gap-y-1" + " " + overlayedClasses}
        >
          <h3 className="font-bold">{formattedData.title}</h3>
          <div className="flex items-center gap-4 text-sm">
            <p className="">{releaseYear}</p>
            <p className="">
              <Image
                src="/icon-nav-movies.svg"
                alt=""
                role="presentation"
                width={12}
                height={12}
                className="mr-2 inline-block aspect-square w-3 object-cover object-center align-middle brightness-[100]"
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
          width={240}
          height={140}
          loading="lazy"
          className="aspect-[240/140] object-cover brightness-75"
        />
      </Link>
    </li>
  );
}
