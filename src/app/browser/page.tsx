"use client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import Home from "@/components/pages/Home";

const BrowserSt = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

function Browser() {
  if (typeof window === "undefined") return null;
  return (
    <BrowserSt>
      <Toaster style={{ fontFamily: "var(--motiva400)" }} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* // !404  */}
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>
    </BrowserSt>
  );
}

export default Browser;
