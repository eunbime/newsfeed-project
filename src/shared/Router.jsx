import Home from 'pages/Home'
import Mypage from 'pages/Mypage'
import Topic from 'pages/Topic'
import Write from 'pages/Write'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
