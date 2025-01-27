import { API } from "@/constants";
import Image from "next/image";

export default function MediaBanner({ details }) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={`${API.image(details.backdrop_path, "original")}`}
        className="scroll-banner-animation block h-96 rounded-tl-3xl rounded-tr-3xl object-cover object-center brightness-75"
        alt={details.overview}
        width={1920}
        height={1080}
        priority
      />
      <div className="absolute bottom-0 w-full animate-slide-up flex-col gap-4 bg-gradient-to-t from-blue-900 via-black to-transparent p-4 sm:flex">
        <div className="flex items-center justify-between sm:flex-col">
          <h1 className="text-balance text-2xl font-bold text-primary">
            {details.name}
          </h1>
          <div className="flex items-center gap-x-3 rounded-lg backdrop-blur-sm">
            <p className="grid aspect-square place-content-center rounded-full border-2 border-blue-600 p-2">
              {Number(details.vote_average).toFixed(1)}
            </p>
            <p>{Number(details.vote_count).toLocaleString()} Reviews</p>
          </div>
        </div>
        <p className="text-balance mx-auto max-w-[48rem] self-end text-center text-base font-light opacity-80">
          {details.overview}
        </p>
      </div>
    </div>
  );
}
