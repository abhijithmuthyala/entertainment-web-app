import Image from "next/image";
import Link from "next/link";

export default function Footer({ className }) {
  return (
    <footer className={"px-4 py-8" + " " + className}>
      <Link
        href="/"
        aria-label="External link to the documentation of TMDB API"
        className="mx-auto block max-w-max"
      >
        <Image
          src="/tmdb-attr.svg"
          width={200}
          height={100}
          alt=""
          className="max-w-[6rem]"
        />
      </Link>
    </footer>
  );
}
