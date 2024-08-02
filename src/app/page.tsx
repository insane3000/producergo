"use client";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import styles from "./page.module.scss";
import React, { useState, useRef, useEffect } from "react";
import Chart from "@/components/organisms/Chart";
import Search from "@/components/organisms/Search";
import APIKey from "@/components/organisms/APIKey";
import Ad from "@/components/atoms/Ad";
import Logs from "@/components/organisms/Logs";
import { prompt } from "@/libs/prompt";
import { Toaster, toast } from "sonner";
import Spinner from "@/components/atoms/Spinner";
import { data } from "@/json/data";
import { extractJSON } from "@/libs/extractJSON";
import Film from "@/components/organisms/Film";
import styled from "styled-components";

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
  margin-top: 2rem;
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
  const [search, setSearch] = useState("");
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
      window.scrollTo(0, 0);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSpinner(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  //   console.log(data);

  return (
    <div className={styles.main}>
      <APIKey apiKey={apiKey} setApiKey={setApiKey} modelInput={modelInput} setModelInput={setModelInput} />
      <Search
        search={search}
        setSearch={setSearch}
        fetchStreamingText={fetchStreamingText}
        setIsStreaming={setIsStreaming}
      />
      {/* <Chart response={response} isStreaming={isStreaming} /> */}

      <TemporalSt>
        {data.slice(0, 100).map((i) => (
          <Film key={i.id} film={i} />
        ))}
      </TemporalSt>
      {/* <Logs response={response} textAreaRef={textAreaRef} /> */}
      {/* <Ad /> */}
      <Toaster style={{ fontFamily: "var(--motiva400)" }} />
      {spinner && (
        <div className={styles.loader}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
