import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FamilyContext } from "context/FamilyContext";
import Home from "pages/Home";
import Topic from "pages/Topic";
import Detail from "pages/Detail";
import Write from "pages/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <FamilyContext.Provider>
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
