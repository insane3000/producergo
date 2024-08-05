import React, { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaPlay, FaHeart } from "react-icons/fa";
import { VscAdd, VscClose, VscComment } from "react-icons/vsc";
import styled from "styled-components";
import { BsCardImage } from "react-icons/bs";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import { toHour } from "@/libs/toHour";

const BannerSt = styled.div`
  width: 100%;
  height: 25rem;
  background: #09090b;
  position: relative;
  display: flex;
  border: 1px solid #2c2c2c;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-top: 1rem;
  /* margin-top: 1rem; */
  /* @media only screen and (max-width: 1000px) {
    height: 50rem;
  } */
  @media only screen and (max-width: 568px) {
    height: 40rem;
  }
`;

const BannerBackdropSt = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: flex-end; // !optional
  .backdrop_image_container {
    width: 100%;
    height: 100%;
    .backdrop_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.2s;
    }
  }

  .backdrop_gradient {
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(0deg, #09090b 0%, rgba(255, 0, 0, 0) 51%, #09090ba2 100%);
  }
  .backdrop_gradient_vertical {
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(90deg, #09090b 0%, rgba(255, 0, 0, 0) 51%, #09090b33 100%);
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
  /* @media only screen and (max-width: 1000px) {
    height: 50rem;
    .backdrop_image_container {
      width: 100%;
      height: 100%;
      .backdrop_image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.2s;
      }
    }
  } */
  /* @media only screen and (max-width: 568px) {
    height: 45rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .backdrop_image_container {
      height: 80%;
      .backdrop_image {
      }
    }
    .backdrop_gradient {
      height: 80%;
    }
  } */
`;
const BannerInformationSt = styled.div`
  width: calc(100% - 2rem);
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  height: auto;
  display: flex;
  flex-direction: column;
  .poster_data_container {
    width: 100%;
    height: auto;
    margin: auto;
    display: grid;
    grid-template-columns: 30rem;
    grid-template-rows: auto auto;

    @media only screen and (max-width: 568px) {
      grid-template-columns: 90%;
      grid-template-rows: auto auto;
    }

    .banner_logo {
      object-fit: contain;
      width: auto;
      max-width: 15rem;
      height: auto;
      max-height: 6rem;

      @media only screen and (max-width: 568px) {
        max-width: 15rem;
        max-height: 4rem;
      }
    }

    .data {
      width: 100%;
      padding: 0.5rem 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;

      .new_title {
        color: #d9d9d9;
        font-size: 0.8rem;
        line-height: 1.2rem;
        font-family: var(--motiva500);
        text-shadow: #0000003b 1px 0 5px;
      }
      .title {
        color: #dedede;
        font-size: 1rem;
        line-height: 1.1rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        font-family: var(--motiva700);
        /* text-transform: uppercase; */
        text-shadow: #0000003b 1px 0 5px;
      }
      .tagline {
        color: #b4b4b4;
        font-size: 0.75rem;
        line-height: 0.9rem;
        margin-bottom: 0.1rem;
        font-family: var(--motiva400);
      }
      .year_runtime_certification {
        color: #b4b4b4;

        line-height: 1.2rem;
        font-family: var(--motiva400);
        display: flex;
        flex-wrap: wrap;
        .year {
          margin-right: 2rem;
          font-size: 0.7rem;
        }
        .runtime {
          margin-right: 2rem;
          font-size: 0.7rem;
        }
        .certification {
          margin-right: 2rem;
          font-size: 0.7rem;
        }
      }
      .vote_average {
        color: white;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--motiva700);
        .iconStar {
          width: 0.8rem;
          height: 0.8rem;
          /* padding: 0.3rem; */
          color: #ffd500;
          margin-right: 0.2rem;
        }
      }
    }
  }
`;
interface props {
  poster_path: string;
  title: string;
  original_title: string;
  tagline: string;
  date: string;
  runtime: number;
  certification: string;
  vote_average: number;

  //!uris
}
export default function Banner(props: props) {
  const STATIC_BUCKET = "https://pub-fe6741d421e5441ebc311462671105e8.r2.dev";
  const [backdrop, setBackdrop] = useState(false);
  const [logo, setLogo] = useState(false);

  return (
    <BannerSt>
      <BannerBackdropSt>
        <picture className="backdrop_image_container">
          <source media="(max-width: 568px)" srcSet={`${STATIC_BUCKET}/backdrops_portrait/w600/${props.poster_path}`} />
          <source
            media="(max-width: 1000px)"
            srcSet={`${STATIC_BUCKET}/backdrops_portrait/w1000/${props.poster_path}`}
          />
          <source media="(min-width: 569px)" srcSet={`${STATIC_BUCKET}/backdrops/w1920/${props.poster_path}`} />
          <img
            className="backdrop_image"
            src={`${STATIC_BUCKET}/backdrops/w1920/${props.poster_path}`}
            alt={props.title}
            onLoad={() => setBackdrop(true)}
            style={backdrop ? { opacity: 1 } : { opacity: 0 }}
          />
        </picture>
        <div className="backdrop_gradient" />
        <div className="backdrop_gradient_vertical" />
      </BannerBackdropSt>
      <BannerInformationSt>
        <div className="poster_data_container">
          <picture>
            <source media="(max-width: 568px)" srcSet={`${STATIC_BUCKET}/logos/w400/${props.poster_path}`} />
            <source media="(min-width: 569px)" srcSet={`${STATIC_BUCKET}/logos/w600/${props.poster_path}`} />
            <img
              className="banner_logo"
              src={`${STATIC_BUCKET}/logos/w600/${props.poster_path}`}
              alt={""}
              onLoad={() => setLogo(true)}
              style={logo ? { opacity: 1 } : { opacity: 0 }}
            />
          </picture>

          <div className="data">
            <p className="title">{props.title || props.original_title}</p>
            <section className="tagline">{props.tagline}</section>
            <section className="year_runtime_certification">
              <div className="year"> {new Date(props.date).getFullYear()}</div>
              <div className="runtime">{props.runtime === 0 ? "Na" : toHour(props.runtime)}</div>
              <div className="certification"> {props.certification}</div>
            </section>
            <section className="vote_average">
              <BsFillBookmarkStarFill className="iconStar" />{" "}
              {props.vote_average === 0 ? "Na" : props.vote_average?.toFixed(1)}
            </section>
          </div>
        </div>
      </BannerInformationSt>
    </BannerSt>
  );
}
