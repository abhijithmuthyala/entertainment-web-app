import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const navIcons = [
  { href: "/", name: "home" },
  { href: "/search", name: "search" },
  { href: "/movie", name: "movies" },
  { href: "/tv", name: "tv-series" },
  { href: "/bookmarks", name: "bookmarks" },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-20 bg-background-muted px-4 lg:top-8 lg:h-[min(60rem,calc(100vh-4rem))] lg:max-w-[6rem] lg:rounded-3xl lg:p-8">
      <header className="flex min-h-header-mobile items-center justify-between md:min-h-header-desktop lg:h-full lg:flex-col lg:gap-y-20">
        <Image
          src="/logo.svg"
          width={25}
          height={20}
          loading="eager"
          alt="Entertainment web app logo - A rectangle filled in red, with three small black lines at the top running in the down-right direction."
          className="md:scale-150"
        />
        <nav>
          <ol className="mx-auto flex items-center gap-x-6 gap-y-3 lg:flex-col">
            {navIcons.map(function renderNavLink({ href, name }) {
              return <NavLink href={href} name={name} key={name} />;
            })}
          </ol>
        </nav>
        <button
          aria-label="Profile"
          className="aspect-square w-6 rounded-full border-1 border-solid border-primary bg-avatar bg-contain bg-center bg-no-repeat lg:mt-auto"
        ></button>
      </header>
    </div>
  );
}

function NavLink({ href, name }) {
  const router = useRouter();
  const isCurrentPage = router.pathname.split("/")[1] === href.slice(1);

  return (
    <li
      className={`py-2 ${isCurrentPage ? "border-b-2 border-highlight" : ""}`}
    >
      <Link href={href} aria-label={name + "page"}>
        <Image
          alt=""
          width={16}
          height={16}
          src={`/icon-nav-${name}.svg`}
          loading="eager"
          className={`aspect-square w-4 invert ${
            !isCurrentPage ? "opacity-75" : ""
          } aspect-square md:w-6`}
        />
      </Link>
    </li>
  );
}
