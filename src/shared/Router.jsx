import Detail from "pages/Detail";
import Topic from "pages/Topic";
import Write from "pages/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPost from "../pages/DetailPost";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Topic />} />
        <Route path="/write" element={<Write />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="/" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
