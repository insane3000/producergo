import { data, FilmIT } from "@/json/data";
import { findBigNumber } from "@/libs/findBigNumber";
import { performance } from "@/libs/performance";
import { useApiKeyStore } from "@/store/apiKeyStore";
import { useFilmStore } from "@/store/filmStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { toast } from "sonner";

import styled from "styled-components";

const FilmSt = styled.div`
  border: 1px solid #2c2c2c;
  border-radius: 0.5rem;
  background: #2121215f;
  overflow: hidden;
  display: flex;
  background-image: linear-gradient(#1717179e 1px, transparent 0.1rem),
    linear-gradient(90deg, #1717179e 1px, transparent 0.1rem);
  background-size: 1rem 1rem;
  background-position: bottom;
  position: relative;
  &:hover {
    transition: 0.1s;
    background: #3232325f;
  }
  .data_gradient {
    width: 100%;
    height: 100%;
    background: #09090b;
    background: radial-gradient(circle, #0a0a0a00 0%, #09090b 100%);
    position: absolute;
  }
  .data {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: calc(100% - 2.5rem) 2.5rem;
    position: relative;

    .top {
      padding: 0.5rem;
      display: grid;
      grid-template-columns: 8rem calc(100% - 15rem);
      grid-template-rows: 100%;
      gap: 0.5rem;
      .poster {
        width: 100%;
        height: 4rem;
        border-radius: 0.25rem;
        object-fit: cover;
      }

      .chart_container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 0.5rem 0.5rem 1rem;
        gap: 0.5rem;
        .bar {
          /* background: #2c2c2c4a; */
          display: flex;
          justify-content: start;
          align-items: center;
          position: relative;
          border-radius: 0.25rem;
          .percentage {
            width: auto;
            height: 100%;
            border-radius: 0.25rem;
            border-radius: 0rem 1rem 1rem 0;
          }
          .radiant_bg {
            background: #2662d9;
            background: linear-gradient(90deg, #1f4ead 0%, #2662d9 100%);
          }
          .dire_bg {
            background: #e23670;
            background: linear-gradient(90deg, #ac2955 0%, #e23670 100%);
          }
          .numbers {
            font-family: var(--motiva300);
            font-size: 0.65rem;
            color: #a0a0a0;
            position: absolute;
            right: -6.5rem;
          }
        }

        .labels {
          display: grid;
          grid-template-columns: 4rem 4rem 4rem;
          grid-template-rows: 100%;
          gap: 0.5rem;
          .revenue_budget_container {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            .dot {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 100%;
              background: #2662d9;
            }
            .budget_color {
              background: #e23670;
            }
            .text {
              font-family: var(--motiva400);
              font-size: 0.6rem;
              color: #767676;
            }
          }
          .performance_container {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.25rem;

            .icon {
              width: 0.6rem;
              height: 0.6rem;
              color: red;
            }
            .performance {
              font-family: var(--motiva400);
              font-size: 0.6rem;
              color: #767676;
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 100%;
      border-top: 1px solid #2c2c2c;
      /* background: #27272a60; */
      display: grid;
      grid-template-columns: calc(100% - 8rem) 8rem;
      grid-template-rows: 100%;
      align-content: center;
      justify-items: center;
      .title_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 0.5rem;
        .title {
          width: 100%;
          font-family: var(--motiva500);
          font-size: 0.75rem;
          color: #f2f2f2;
          // !Dots ...
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .date {
          width: 100%;
          font-family: var(--motiva400);
          font-size: 0.6rem;
          color: #767676;
          display: flex;
          gap: 0.5rem;
        }
      }

      .buttons_container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1.5rem;
        /* gap: 0.5rem; */
        justify-content: center;
        align-content: center;
        padding: 0 0.5rem;
        text-decoration: none;
        .button {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #2c2c2c;
          background: #09090b;
          border-radius: 0.25rem;
          outline: none;
          font-family: var(--motiva500);
          font-size: 0.65rem;
          color: #d0d0d0;
          transition: 0.1s;
          cursor: default;
          text-decoration: none;
          user-select: none;
          &:hover {
            transition: 0.1s;
            background: #19191e;
          }
        }
        .white {
          background: white;
          color: black;
          border: none;
          &:hover {
            transition: 0.1s;
            background: #d9d9d9;
          }
        }
      }
    }
  }
`;
interface props {
  film: FilmIT;
  currentData: FilmIT[];
}
export default function Film(props: props) {
  const router = useRouter();
  const { apiKey, setApiKey, modelInput, setModelInput } = useApiKeyStore((state) => state);
  const { film, setFilm } = useFilmStore((state) => state);

  return (
    <FilmSt>
      <div className="data_gradient"></div>
      <div className="data">
        <div className="top">
          <img
            className="poster"
            src={`https://pub-fe6741d421e5441ebc311462671105e8.r2.dev/posters_landscape/w350/${props.film.poster_path}`}
            alt={props.film.title}
          />

          <div className="chart_container">
            <div className="bar">
              <div
                className="percentage radiant_bg"
                style={{
                  width: `${findBigNumber(props.currentData, "revenue", "budget", props.film.revenue)}%`,
                  //   background: "#2662d9",
                }}
              ></div>
              <div className="numbers">{new Intl.NumberFormat().format(props.film.revenue)} USD</div>
            </div>
            <div className="bar">
              <div
                className="percentage dire_bg"
                style={{
                  width: `${findBigNumber(props.currentData, "revenue", "budget", props.film.budget)}%`,
                  //   background: "#e23670",
                }}
              >
                <div className="numbers">{new Intl.NumberFormat().format(props.film.budget)} USD</div>
              </div>
            </div>
            <div
              className="labels"
              //       style={
              //         performance(props.film.budget, props.film.revenue) > 0 ? { color: "#47ff9a" } : { color: "#ff0059" }
              //       }
            >
              {/* {performance(props.film.budget, props.film.revenue) > 0
                ? `+${performance(props.film.budget, props.film.revenue).toFixed(0)}%`
                : `${performance(props.film.budget, props.film.revenue).toFixed(0)}%`} */}
              <div className="revenue_budget_container">
                <div className="dot"></div>
                <div className="text">Ganancia</div>
              </div>
              <div className="revenue_budget_container">
                <div className="dot budget_color"></div>
                <div className="text">Inversión</div>
              </div>
              <div className="performance_container">
                {performance(props.film.budget, props.film.revenue) > 0 ? (
                  <FaLongArrowAltUp className="icon" style={{ color: "#47ff9a" }} />
                ) : (
                  <FaLongArrowAltDown className="icon" style={{ color: "#ff0059" }} />
                )}
                <div
                  className="performance"
                  //   style={
                  //     performance(props.film.budget, props.film.revenue) > 0 ? { color: "#47ff9a" } : { color: "#ff0059" }
                  //   }
                >
                  {performance(props.film.budget, props.film.revenue) > 0
                    ? `${performance(props.film.budget, props.film.revenue).toFixed(0)}%`
                    : `${performance(props.film.budget, props.film.revenue).toFixed(0)}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="title_container">
            <div className="title">{props.film.title}</div>
            <div className="date">
              {new Date(props.film.date).toLocaleString("es-MX", {
                year: "numeric",
                // month: "short",
                // weekday: "short",
                // day: "numeric",
              })}
              <div></div>
              {props.film.certification}
            </div>
          </div>

          <div className="buttons_container">
            {/* <div className="button">Similares</div> */}
            <div
              className="button white"
              onClick={() => {
                if (apiKey.length === 0) {
                  toast("Debes introducir tu Perplexity API Key");
                  return;
                }
                router.push(`/films/${props.film.id}`);
                setFilm(props.film);
              }}
            >
              Analizar con IA
            </div>
          </div>
        </div>
      </div>
    </FilmSt>
  );
}
