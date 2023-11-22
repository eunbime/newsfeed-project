import Detail from "pages/Detail";
import Write from 'pages/Write';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Topic />} />
        <Route path="/write" element={<Write />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
