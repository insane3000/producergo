import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import styled from "styled-components";
import folders from "../../json/folders.json";
const SearchSt = styled.form`
  width: 100%;
  height: auto;

  .title {
    font-family: var(--motiva700);
    font-size: 0.9rem;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  .search_container {
    width: 100%;
    height: 2rem;
    /* margin-bottom: 1rem; */
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 2rem;
    gap: 0.5rem;
    margin-bottom: 1rem;
    .container_icon_input {
      background: #0a0a0a;
      border: 1px solid #2c2c2c;
      border-radius: 0.25rem;
      display: grid;
      grid-template-columns: 2.5rem calc(100% - 2.5rem);
      grid-template-rows: 100%;
      .seach_icon {
        width: 1rem;
        height: 1rem;
        justify-self: center;
        align-self: center;
        color: #9e9e9e;
      }
      .seach_input {
        font-family: var(--motiva400);
        font-size: 0.75rem;
        color: #ffffff;
        background: none;
        border-style: none;
        outline: none;
      }
      ::placeholder {
        color: #9e9e9e;
        opacity: 1; /* Firefox */
      }

      ::-ms-input-placeholder {
        /* Edge 12 -18 */
        color: #9e9e9e;
      }
    }
    .box_select {
      width: 100%;
      height: 100%;
      background: #27272a;
      border: 1px solid hsla(240 3.7% 15.9%);
      border-radius: 0.25rem;
      color: #bdbdbd;
      font-family: var(--motiva400);
      font-size: 0.75rem;
      padding: 0 1rem;
      padding: 0 2.5rem 0 1rem;
      outline: none;

      // !HIDE UGLY ARROW
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-image: url("/BottomArrowIcon.png");
      background-repeat: no-repeat;
      background-position: calc(100% - 0.8rem) center;
      background-size: 0.8rem;
      .box_option {
        color: #bdbdbd;
        font-family: var(--motiva400);
        font-size: 0.75rem;
      }
    }
    .button_prediction {
      border: 1px solid #e23670;
      background: #09090b;
      border-radius: 0.25rem;
      outline: none;
      font-family: var(--motiva500);
      font-size: 0.75rem;
      color: #d0d0d0;
      transition: 0.1s;

      &:hover {
        transition: 0.1s;
        background: #19191e;
      }
    }
    .button_search {
      border: 1px solid #2662d9;
      background: #09090b;
      border-radius: 0.25rem;
      outline: none;
      font-family: var(--motiva500);
      font-size: 0.75rem;
      color: #d0d0d0;
      transition: 0.1s;

      &:hover {
        transition: 0.1s;
        background: #19191e;
      }
    }
  }
`;
interface props {
  search: string;
  setSearch: (key: string) => void;
  fetchStreamingText: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsStreaming: (value: boolean) => void;
}
export default function Search(props: props) {
  return (
    <SearchSt onSubmit={(e) => props.fetchStreamingText(e)}>
      <p className="title">ProducerGO</p>
      <div className="search_container">
        <div className="container_icon_input">
          <FiSearch className="seach_icon" />
          <input
            className="seach_input"
            type="text"
            name="search"
            value={props.search}
            onChange={(e) => props.setSearch(e.currentTarget.value)}
            placeholder="Buscar..."
            onFocus={(e) => e.currentTarget.select()}
            //     required
          />
        </div>
        <select
          className="box_select"
          name="indexDate"
          //   value={props.date}
          //   onChange={(e) => {
          //     props.setDate(e.currentTarget.value);
          //     props.setIndexSlice(40);
          //   }}
          required
        >
          {folders.map((i) => (
            <option key={i.name} className="box_option" value={i.value}>
              {i.name}
            </option>
          ))}
        </select>
        <select
          className="box_select"
          name="indexDate"
          //   value={props.quantity}
          //   onChange={(e) => {
          //     props.setQuantity(+e.currentTarget.value);
          //     props.handleCurrentDate();
          //     props.setIndexSlice(40);
          //   }}
          required
        >
          <option className="box_option" value="">
            Certificado
          </option>
          <option className="box_option" value="G">
            G
          </option>
          <option className="box_option" value="PG">
            PG
          </option>
          <option className="box_option" value="PG-13">
            PG-13
          </option>
          <option className="box_option" value="R">
            R
          </option>
          <option className="box_option" value="NC-17">
            NC-17
          </option>
        </select>

        {/* <button className="button_prediction" type="submit">
          Relizar predicción
        </button> */}
      </div>
    </SearchSt>
  );
}
