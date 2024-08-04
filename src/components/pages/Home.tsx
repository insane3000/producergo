"use client";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import React, { useState, useRef, useEffect } from "react";
import Chart from "@/components/organisms/Chart";
import Search from "@/components/organisms/Search";
import APIKey from "@/components/organisms/APIKey";
import Ad from "@/components/atoms/Ad";
import Logs from "@/components/organisms/Logs";
import { prompt } from "@/libs/prompt";
import { Toaster, toast } from "sonner";
import Spinner from "@/components/atoms/Spinner";
import { data, FilmIT } from "@/json/data";
import { extractJSON } from "@/libs/extractJSON";
import Film from "@/components/organisms/Film";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { Outlet } from "react-router-dom";
const HomeSt = styled.div`
  width: 100%;
  height: auto;
  .header {
    width: 100%;
    height: auto;
    background: #09090B;
 
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
const TemporalSt = styled.div`
  width: 100%;
  height: auto;
  /* background: #09090b;
  border: 1px solid #2c2c2c; */
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  /* padding: 1rem; */
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: max-content;
  gap: 1rem;
  margin-top: 1rem;
  /* overflow-y: scroll; */
  // !Scroll style
  scrollbar-color: #4d4d4d69 transparent;
  scrollbar-width: thin;
`;

export default function Home() {
  const textAreaRef = useRef<any>(null);
  const [spinner, setSpinner] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [modelInput, setModelInput] = useState("llama-3-sonar-small-32k-chat");
  //   const [search, setSearch] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [response, setResponse] = useState("");

  // Configuración del proveedor de OpenAI con la clave de API
  const openaiProvider = createOpenAI({
    apiKey: apiKey,
    baseURL: "https://api.perplexity.ai",
    compatibility: "compatible", // Modo estricto para usar la API de OpenAI
  });

  const fetchStreamingText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (apiKey.length === 0) {
      toast("Debes introducir tu Perplexity API Key");
      if (typeof window !== "undefined") window.scrollTo(0, 0);
      return;
    }
    setIsStreaming(true);
    try {
      const model = openaiProvider.chat(modelInput);
      const { textStream } = await streamText({
        model: model,
        prompt: prompt("", 0),
      });
      let accumulatedText = "";
      for await (const textPart of textStream) {
        accumulatedText += textPart;
        setResponse(accumulatedText);
        // Scroll to the bottom to show the latest text
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
      }
    } catch (error) {
      toast("Error solicitando los datos.");
    } finally {
      setIsStreaming(false);
    }
  };

  // !handlers
  const limit = 10;
  const [currentData, setCurrentData] = useState<FilmIT[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);

  const filtered = data.filter(
    (i) =>
      i.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      i.original_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      i.folder.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      i.keywords.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  useEffect(() => {
    //     setPage(2);
    const paginated_data = data.slice(0 * limit, 1 * limit);
    setCurrentData(paginated_data);
    setSpinner(false);
  }, []);

  useEffect(() => {
    setPage(2);
    const paginated_data = filtered.slice(0 * limit, 1 * limit);
    setCurrentData(paginated_data);
    setSpinner(false);
  }, [search]);

  function paginateFilms(array: FilmIT[], page_size: number, page_number: number) {
    const paginated_data = array.slice((page_number - 1) * page_size, page_number * page_size);
    setCurrentData([...currentData, ...paginated_data]);
    setPage(page_number + 1);
  }
  const timerRef = useRef<any>(null);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.currentTarget.value.trim().replace(/[^a-zA-Z 0-9.]+/g, "");
    const value = e.currentTarget.value;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "10px 20px 500px 40px",
  });

  useEffect(() => {
    inView && paginateFilms(filtered, 10, page);
  }, [inView]);

  return (
    <HomeSt>
      <div className="header">
        <div className="border_spacer_top"></div>
        <APIKey apiKey={apiKey} setApiKey={setApiKey} modelInput={modelInput} setModelInput={setModelInput} />
        <Search
          search={search}
          setSearch={setSearch}
          fetchStreamingText={fetchStreamingText}
          setIsStreaming={setIsStreaming}
          handleChangeSearch={handleChangeSearch}
          timerRef={timerRef}
        />
        <div className="border_spacer_bottom"></div>
      </div>
      {/* <Chart response={response} isStreaming={isStreaming} /> */}

      <TemporalSt>
        {currentData.map((i) => (
          <Film key={i.id} film={i} currentData={currentData} />
        ))}
        {Math.ceil(filtered.length / limit) > page - 1 && <div ref={ref}>cargar mas</div>}
      </TemporalSt>
      {/* <Logs response={response} textAreaRef={textAreaRef} /> */}
      {/* <Ad /> */}
      {/* <Toaster style={{ fontFamily: "var(--motiva400)" }} /> */}
      <Outlet />
      {spinner && (
        <div className="loader">
          <Spinner />
        </div>
      )}
    </HomeSt>
  );
}
