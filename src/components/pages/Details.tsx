import React from "react";
import styled from "styled-components";
export const DetailSt = styled.div`
  width: calc(100% - 4rem);
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 4rem;
  bottom: 0;
  overflow-y: scroll;
  padding: 2rem 0.5rem;
  background: black;
  .container_main_reward {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    height: auto;
    margin: auto;
    color: white;
  }


`;

export default function Details() {
  return <DetailSt>Details</DetailSt>;
}
