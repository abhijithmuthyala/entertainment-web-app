import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { API } from "@/constants";
import { useBookmarksContext } from "@/context/bookmarks";
import { formatData } from "@/helpers";
import { titleCase } from "@/utils";

const mediaIconNames = {
  movie: "movies",
  tv: "tv-series",
};

const requiredFields = new Set([
  "releaseDate",
  "firstAirDate",
  "id",
  "mediaType",
  "title",
  "name",
  "backdropPath",
]);

export default function MediaLink({
  data,
  priority,
  shouldLoadEagerly,
  overlayInfo = false,
}) {
  const [showSkeleton, setShowSkeleton] = useState(true);

  const formattedData = formatData(data, requiredFields);
  const releaseYear =
    new Date(
      formattedData.releaseDate || formattedData.firstAirDate,
    ).getFullYear() || null;

  const { bookmarks, toggleBookmark } = useBookmarksContext();
  const isBookmarked = bookmarks.find(
    (bookmark) =>
      bookmark.id === formattedData.id &&
      bookmark.mediaType === formattedData.mediaType,
  );

  const overlayedClasses = overlayInfo
    ? "absolute z-10 block w-full p-4 bottom-0"
    : "";

  function handleBookmark() {
    toggleBookmark(formattedData);
  }

  function removeSkeleton() {
    setShowSkeleton(false);
  }

  return (
    <li className="group relative animate-scale-in overflow-hidden rounded-lg transition-all hover:bg-background-muted">
      <Link
        href={`/${data.media_type}/${data.id}`}
        className="flex flex-col-reverse gap-y-2"
      >
        <div
          className={"flex flex-col-reverse gap-y-1" + " " + overlayedClasses}
        >
          <h3 className="font-bold md:text-md">
            {formattedData.title || formattedData.name}
          </h3>
          <div className="flex items-center gap-4 text-sm md:text-base">
            {releaseYear && <p className="">{releaseYear}</p>}
            <p className="flex items-center gap-1 align-bottom">
              <Image
                src={`/icon-nav-${mediaIconNames[formattedData.mediaType]}.svg`}
                alt=""
                width={12}
                height={12}
                className="inline-block aspect-square w-3 object-cover object-center align-middle invert"
              />
              {titleCase(formattedData.mediaType)}
            </p>
          </div>
        </div>
        <div
          className={`aspect-media-mobile w-full overflow-hidden rounded-lg md:aspect-media-desktop ${
            overlayInfo &&
            "aspect-media-overlay-mobile md:aspect-media-overlay-desktop"
          } ${showSkeleton && "skeleton"}`}
        >
          <Image
            src={API.image(formattedData.backdropPath)}
            alt=""
            width={470}
            height={230}
            priority={priority}
            loading={shouldLoadEagerly ? "eager" : undefined}
            onLoad={removeSkeleton}
            className={`h-full object-cover brightness-75 transition-all duration-200 group-hover:scale-110  `}
          />
        </div>
      </Link>
      <button
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        onClick={handleBookmark}
        className={`absolute right-2 top-2 ${
          isBookmarked ? "bg-bookmark-full" : "bg-bookmark-empty"
        } aspect-square w-8 bg-contain bg-no-repeat`}
      ></button>
    </li>
  );
}
