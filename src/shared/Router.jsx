import Write from 'pages/Write'
import Test from 'pages/test'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Detail from '../pages/Detail'
import Layout from './Layout'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index path="/" element={<Home />} /> */}
          <Route index path="/" element={<Detail />} />
          <Route index path="/test" element={<Test />} />
          <Route path="/write" element={<Write />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
