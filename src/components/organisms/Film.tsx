import { FilmIT } from "@/json/data";
import React from "react";
import styled from "styled-components";

const FilmSt = styled.div`
  width: 100%;
  height: 8rem;
  background: #09090b;
  border: 1px solid #2c2c2c;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 10rem 15rem calc(100% - 27rem);
  grid-template-rows: 100%;
  gap: 1rem;
  .poster {
    width: 100%;
    height: 100%;
    /* width: 10rem;
    height: 100%; */
    border-radius: 0.5rem;
  }
  .info {
    .title {
      font-family: var(--motiva1000);
      font-size: 1rem;
      line-height: 1rem;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    .date {
      font-family: var(--motiva300);
      font-size: 0.7rem;
      color: #999999;
      margin-bottom: 0.5rem;
    }
    .button_prediction {
      padding: 0.25rem 0.5rem;
      /* border: 1px solid #444444; */
      outline: none;
      border-style: none;
      background: #ffffff;
      border-radius: 0.25rem;
      outline: none;
      font-family: var(--motiva500);
      font-size: 0.75rem;
      color: #000000;
      transition: 0.1s;

      &:hover {
        transition: 0.1s;
        background: #dedede;
      }
    }
  }
  .chart {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    .row {
      background: #ff0000bd;
      border-radius: 0.5rem;
    }
  }
`;
interface props {
  film: FilmIT;
}
export default function Film(props: props) {
  console.log(props.film);

  return (
    <FilmSt>
      <img
        className="poster"
        src={`https://pub-fe6741d421e5441ebc311462671105e8.r2.dev/posters_landscape/w350/${props.film.poster_path}`}
        alt=""
      />
      <div className="info">
        <p className="title">{props.film.title}</p>
        <p className="date">{props.film.date}</p>
        <button className="button_prediction" type="submit">
          Analizar rendimiendo.
        </button>
      </div>
      <div className="chart">
        <div className="row" style={{ background: "#2662d9" }}></div>
        <div className="row" style={{ background: "#e23670" }}></div>
      </div>
    </FilmSt>
  );
}
