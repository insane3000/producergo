"use client";
// import { prompt } from "@/libs/prompt";
// import { useApiKeyStore } from "@/store/apiKeyStore";
// import { createOpenAI } from "@ai-sdk/openai";
// import { streamText } from "ai";
import { useParams } from "next/navigation";
// import React, { useRef, useState } from "react";
// import { toast, Toaster } from "sonner";
import { data } from "@/json/data";
export default function Page() {
  const params = useParams();

  const film = data.find((i) => i.id === +params.id);

//   const { apiKey, modelInput } = useApiKeyStore((state) => state);

//   const textAreaRef = useRef<any>(null);
//   const [_isStreaming, setIsStreaming] = useState(false);
//   const [_response, setResponse] = useState("");
//   // Configuración del proveedor de OpenAI con la clave de API
//   const openaiProvider = createOpenAI({
//     apiKey: apiKey,
//     baseURL: "https://api.perplexity.ai",
//     compatibility: "compatible", // Modo estricto para usar la API de OpenAI
//   });

  //   const fetchStreamingText = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (apiKey.length === 0) {
  //       toast("Debes introducir tu Perplexity API Key");
  //       if (typeof window !== "undefined") window.scrollTo(0, 0);
  //       return;
  //     }
  //     setIsStreaming(true);
  //     try {
  //       const model = openaiProvider.chat(modelInput);
  //       const { textStream } = await streamText({
  //         model: model,
  //         prompt: prompt("", 0),
  //       });
  //       let accumulatedText = "";
  //       for await (const textPart of textStream) {
  //         accumulatedText += textPart;
  //         setResponse(accumulatedText);
  //         // Scroll to the bottom to show the latest text
  //         if (textAreaRef.current) {
  //           textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
  //         }
  //       }
  //     } catch (error) {
  //       toast("Error solicitando los datos.");
  //     } finally {
  //       setIsStreaming(false);
  //     }
  //   };

  return (
    <div>
      <img src={`https://pub-fe6741d421e5441ebc311462671105e8.r2.dev/backdrops/w1920/${film?.poster_path}`} alt="" />
      {params.id}
      {/* <Toaster style={{ fontFamily: "var(--motiva400)" }} /> */}
    </div>
  );
}
