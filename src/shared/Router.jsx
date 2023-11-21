import Detail from "pages/Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
