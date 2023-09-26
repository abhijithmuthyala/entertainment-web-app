import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext, useState } from "react";

import { BookmarksContext } from "@/context/bookmarks";
import { SearchContext } from "@/context/search";

import { API } from "@/constants";
import { titleCase } from "@/utils";

const mediaIconNames = {
  movie: "movies",
  tv: "tv-series",
};

export default function MediaLink({ data, overlayInfo = false }) {
  const router = useRouter();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const formattedData = formatData(data);
  const releaseYear = new Date(
    formattedData.releaseDate || formattedData.firstAirDate,
  ).getFullYear();

  const { onFetchSearchResults } = useContext(SearchContext);
  const { bookmarksData, toggleBookmark } = useContext(BookmarksContext);
  const isBookmarked = bookmarksData.find(
    (bookmark) =>
      bookmark.id === formattedData.id &&
      bookmark.mediaType === formattedData.mediaType,
  );

  const overlayedClasses = overlayInfo
    ? "absolute z-10 block w-full p-4 bottom-0"
    : "";

  function handleBookmark() {
    toggleBookmark(formattedData);
    if (router.pathname === "/bookmarks") {
    }
  }

  function removeSkeleton() {
    setShowSkeleton(false);
  }

  return (
    <li className="group relative overflow-hidden rounded-lg transition-all hover:scale-105 hover:bg-background-muted">
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
            role="presentation"
            width={470}
            height={230}
            loading="lazy"
            onLoad={removeSkeleton}
            className={`h-full object-cover brightness-75 transition-all duration-200 group-hover:scale-125  `}
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

function formatData(data) {
  const formattedData = {};
  const requiredFields = new Set([
    "releaseDate",
    "firstAirDate",
    "id",
    "mediaType",
    "title",
    "name",
    "backdropPath",
  ]);

  for (const key in data) {
    const formattedKey = key
      .split("_")
      .map((word, index) => {
        if (index === 0) {
          return word.replace(word[0], word[0].toLowerCase());
        }
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join("");
    if (requiredFields.has(formattedKey)) {
      formattedData[formattedKey] = data[key];
    }
  }

  return formattedData;
}
