import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

import { BookmarksProvider } from "@/context/bookmarks";

import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="mx-auto grid max-w-[90rem] grid-cols-1 grid-rows-[auto,auto] justify-center lg:grid-cols-[auto,minmax(0,1fr)] lg:grid-rows-[auto] lg:gap-x-9 lg:p-8">
      <Header />
      <BookmarksProvider>
        <Component {...pageProps} form={<SearchForm />} />
      </BookmarksProvider>
    </div>
  );
}
