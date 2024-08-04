import { FilmIT } from "@/json/data";
import { findBigNumber } from "@/libs/findBigNumber";
import { performance } from "@/libs/performance";
import React from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import styled from "styled-components";

const ChartSt = styled.div`
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
  margin-top: 1rem;
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
    grid-template-rows: 100%;
    position: relative;

    .top {
      padding: 1rem;
      display: grid;
      grid-template-columns: calc(100% - 6.5rem);
      grid-template-rows: 100%;

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
            border-radius: 0rem 0.5rem 0.5rem 0;
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
  }
`;
interface props {
  film: FilmIT;
}
export default function Chart(props: props) {
  return (
    <ChartSt>
      <div className="data_gradient"></div>
      <div className="data">
        <div className="top">
          <div className="chart_container">
            <div className="bar">
              <div
                className="percentage radiant_bg"
                style={{
                  width: `${findBigNumber([props.film], "revenue", "budget", props.film.revenue)}%`,
                }}
              ></div>
              <div className="numbers">{new Intl.NumberFormat().format(props.film.revenue)} USD</div>
            </div>
            <div className="bar">
              <div
                className="percentage dire_bg"
                style={{
                  width: `${findBigNumber([props.film], "revenue", "budget", props.film.budget)}%`,
                }}
              >
                <div className="numbers">{new Intl.NumberFormat().format(props.film.budget)} USD</div>
              </div>
            </div>
            <div className="labels">
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
                <div className="performance">
                  {performance(props.film.budget, props.film.revenue) > 0
                    ? `${performance(props.film.budget, props.film.revenue).toFixed(0)}%`
                    : `${performance(props.film.budget, props.film.revenue).toFixed(0)}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartSt>
  );
}
