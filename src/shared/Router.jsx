import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FamilyContext } from "context/FamilyContext";
import GlobalStyle from "styles/GlobalStyle";
import Home from "papges/Home";
import Topic from "papges/Topic";
import Detail from "papges/Detail";
import Write from "papges/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <FamilyContext.Provider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="topic" element={<Topic />} />
          <Route path="/write" element={<Write />} />
          <Route path="detail/:id" element={<Detail />} />
        </Routes>
      </FamilyContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
