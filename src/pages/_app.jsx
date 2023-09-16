import SearchForm from "@/components/SearchForm";
import Header from "@/components/Header";

import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SearchForm />
      <Component {...pageProps} />
    </>
  );
}
