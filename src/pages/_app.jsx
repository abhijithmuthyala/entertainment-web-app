import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { BookmarksProvider } from "@/context/bookmarks";
import { SearchProvider } from "@/context/search";

import "@/styles/global.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-stretch justify-between">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 grid-rows-[auto,auto] justify-center lg:grid-cols-[auto,minmax(0,1fr)] lg:grid-rows-[auto] lg:gap-x-9 lg:p-8">
        <Header />
        <BookmarksProvider>
          <SearchProvider key={router.pathname}>
            <Component {...pageProps} />
          </SearchProvider>
        </BookmarksProvider>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
