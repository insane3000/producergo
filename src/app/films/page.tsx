"use client";
import React, { useEffect } from "react";
import Search from "@/components/organisms/Search";
import APIKey from "@/components/organisms/APIKey";
import { data } from "@/json/data";
import Film from "@/components/organisms/Film";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useSearchStore } from "@/store/searchStore";
import { usePageStore } from "@/store/pageStore";
import { useCurrentDataStore } from "@/store/currentDataStore";
import { useApiKeyStore } from "@/store/apiKeyStore";
import { Toaster } from "sonner";

const HomeSt = styled.div`
  width: 100%;
  height: auto;
  .header {
    width: 100%;
    height: auto;
    background: #09090b;

    position: sticky;
    top: 0rem;
    z-index: 1;
    .border_spacer_top {
      width: 100%;
      height: 2rem;
    }
    .border_spacer_bottom {
      width: 100%;
      height: 1rem;
    }
  }
  .film_container {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: max-content;
    gap: 1rem;
    margin-top: 1rem;
  }
  .loader {
    width: 100%;
    height: 100%;
    background: #09090b;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export default function Page() {
  const { currentData, setCurrentData } = useCurrentDataStore((state) => state);
  const { search, setSearch } = useSearchStore((state) => state);
  const { page, setPage } = usePageStore((state) => state);
  const { apiKey, setApiKey, modelInput, setModelInput } = useApiKeyStore((state) => state);
  const limit = 10;

  useEffect(() => {
    if (currentData.length === 0) {
      const paginated_data = data.slice(0 * limit, 1 * limit);
      setCurrentData(paginated_data);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const filtered = data.filter(
      (i) =>
        i.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        i.original_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        i.folder.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      // i.keywords.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    e.preventDefault();
    setPage(2);
    const paginated_data = filtered.slice(0 * limit, 1 * limit);
    setCurrentData(paginated_data);
    window.scrollTo(0, 0);
  };
  const handleReset = () => {
    setPage(2);
    const paginated_data = data.slice(0 * limit, 1 * limit);
    setCurrentData(paginated_data);
    window.scrollTo(0, 0);
  };

  function paginateFilms(page_size: number, page_number: number) {
    const filtered = data.filter(
      (i) =>
        i.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        i.original_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        i.folder.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      // i.keywords.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    const paginated_data = filtered.slice((page_number - 1) * page_size, page_number * page_size);
    setCurrentData([...currentData, ...paginated_data]);
    setPage(page_number + 1);
  }

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "10px 20px 500px 40px",
  });

  useEffect(() => {
    inView && paginateFilms(10, page);
  }, [inView]);

  return (
    <HomeSt>
      <div className="header">
        <div className="border_spacer_top"></div>
        <APIKey apiKey={apiKey} setApiKey={setApiKey} modelInput={modelInput} setModelInput={setModelInput} />
        <Search search={search} setSearch={setSearch} handleSearch={handleSearch} handleReset={handleReset} />
        <div className="border_spacer_bottom"></div>
      </div>
      <div className="film_container">
        {currentData.map((i) => (
          <Film key={i.id} film={i} currentData={currentData} />
        ))}
        {<div ref={ref} style={{ width: "100%", height: "2rem" }}></div>}
      </div>
      <Toaster style={{ fontFamily: "var(--motiva400)" }} />
    </HomeSt>
  );
}
