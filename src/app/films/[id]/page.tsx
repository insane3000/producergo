"use client";
// import { prompt } from "@/libs/prompt";
// import { useApiKeyStore } from "@/store/apiKeyStore";
// import { createOpenAI } from "@ai-sdk/openai";
// import { streamText } from "ai";
import { useParams } from "next/navigation";
// import React, { useRef, useState } from "react";
// import { toast, Toaster } from "sonner";
import { data } from "@/json/data";
import { useFilmStore } from "@/store/filmStore";
import styled from "styled-components";
import Banner from "@/components/organisms/Banner";
import Chart from "@/components/organisms/Chart";
import Logs from "@/components/organisms/Logs";
import { toast, Toaster } from "sonner";
import { streamText } from "ai";
import { useApiKeyStore } from "@/store/apiKeyStore";
import { useEffect, useRef, useState } from "react";
import { createOpenAI } from "@ai-sdk/openai";
import { prompt, word } from "@/libs/prompt";
import { performance } from "@/libs/performance";
import Error from "@/components/atoms/Error";

const FilmSt = styled.div`
  width: 100%;
  height: auto;
  /* .container_banner_chart {
    width: 100%;
    height: 30rem;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 100%;
    gap: 1rem;
    margin-top: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    .container_banner_chart {
      grid-template-columns: 100%;
      grid-template-rows: 30rem 20rem;
    }
  } */
  .response {
    border: 1px solid #2c2c2c;
    border-radius: 0.5rem;

    margin-top: 1rem;
    margin-bottom: 4rem;
    padding: 1rem;
    .title_prompt {
      font-family: var(--motiva500);
      font-size: 1.25rem;
      color: #dddddd;
    }
    .data {
      width: 100%;
      height: auto;
      white-space: normal;
      font-family: var(--motiva300);
      font-size: 0.9rem;
      color: #d6d6d6;
      margin-top: 1rem;
      h2 {
        font-family: var(--motiva400);
        margin-top: 1rem;
        color: #dddddd;
      }
    }
  }
`;

export default function Page() {
  const params = useParams();
  //   const { film, setFilm } = useFilmStore((state) => state);
  const { apiKey, setApiKey, modelInput, setModelInput } = useApiKeyStore((state) => state);
  const film = data.find((i) => i.id === +params.id);
  const textAreaRef = useRef<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [response, setResponse] = useState("");
  // Configuración del proveedor de OpenAI con la clave de API
  const openaiProvider = createOpenAI({
    apiKey: apiKey,
    baseURL: "https://api.perplexity.ai",
    compatibility: "compatible", // Modo estricto para usar la API de OpenAI
  });

  const fetchStreamingText = async () => {
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
        prompt: prompt(film),
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
    if (film && apiKey !== "") fetchStreamingText();
  }, []);

  function insertH2(texto: string) {
    // Expresión regular para encontrar texto entre ** y opcionalmente un número antes, incluyendo :
    const regex = /(\d+\.\s*)?\*\*(.*?)\*\*(:?)/g;

    // Reemplazar las coincidencias con el formato deseado, manteniendo el resto del texto
    const result = texto.replace(regex, (match: string, numero: string, contenido: string, dosPuntos: string) => {
      return `<h2>${numero ? numero : ""}${contenido}${dosPuntos}</h2>`;
    });
    return result;
  }
  if (!film) {
    return <Error />;
  }
  return (
    <FilmSt>
      <Banner
        poster_path={film.poster_path}
        title={film.title}
        original_title={film.original_title}
        tagline={film.tagline}
        date={film.date}
        runtime={film.runtime}
        certification={film.certification}
        vote_average={film.vote_average}
      />
      <Chart film={film} />

      {/* <Logs response={response} textAreaRef={textAreaRef} /> */}
      <div className="response">
        <h1 className="title_prompt">
          Razones por el {word(performance(film?.budget || 0, film?.revenue || 0))} financiero de la película{" "}
          {film?.title} de {new Date(film?.date || 0).getFullYear()}
        </h1>
        <div
          className="data"
          dangerouslySetInnerHTML={{
            __html: insertH2(response),
          }}
        ></div>
      </div>

      <Toaster style={{ fontFamily: "var(--motiva400)" }} />
    </FilmSt>
  );
}
