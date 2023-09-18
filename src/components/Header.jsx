import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const navIcons = [
  { href: "/", name: "home" },
  { href: "/movies", name: "movies" },
  { href: "/tv-series", name: "tv-series" },
  { href: "/bookmarks", name: "bookmarks" },
];

export default function Header() {
  return (
    <div className="bg-background-muted px-4">
      <header className="flex min-h-header flex-wrap items-center justify-between">
        <Image
          src="/logo.svg"
          width={25}
          height={20}
          alt="Entertainment web app logo - A rectangle filled in red, with three small black lines at the top running in the down-right direction."
        />
        <nav className="mx-auto flex items-center gap-x-6">
          {navIcons.map(function renderNavLink({ href, name }) {
            return <NavLink href={href} name={name} key={name} />;
          })}
        </nav>
        <button
          aria-label="Profile"
          className="aspect-square w-6 rounded-full border-1 border-solid border-primary bg-avatar bg-contain bg-center bg-no-repeat"
        ></button>
      </header>
    </div>
  );
}

function NavLink({ href, name }) {
  const router = useRouter();
  const isCurrentPage = router.pathname === href;

  return (
    <li>
      <Link href={href} aria-label={name + "page"}>
        <Image
          alt=""
          role="presentation"
          width={16}
          height={16}
          src={`/icon-nav-${name}.svg`}
          className={`${isCurrentPage ? "brightness-[100]" : ""} aspect-square`}
        />
      </Link>
    </li>
  );
}
