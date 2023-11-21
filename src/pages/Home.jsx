import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>홈 페이지</h2>
      <p>이곳은 홈 페이지입니다.</p>
      
      
      <Link to="/detail">상세 페이지로 이동</Link>
    </div>
  );
};

export default Home;