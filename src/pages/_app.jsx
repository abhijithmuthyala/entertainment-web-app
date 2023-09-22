import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

import { BookmarksProvider } from "@/context/bookmarks";

import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="">
      <Header />
      <BookmarksProvider>
        <Component {...pageProps} form={<SearchForm />} />
      </BookmarksProvider>
    </div>
  );
}
