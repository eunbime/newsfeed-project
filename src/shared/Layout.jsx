import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function Layout() {
  return (
    <div>
      <Header>
        <Title>Enjoy P</Title>
        <HeaderRight>
          <Search>
            <input type="text" placeholder="검색어를 입력해주세요" />
            <button>검색</button>
          </Search>
          <button>글작성</button>
          <button>로그인</button>
        </HeaderRight>
      </Header>
      <StLayout>
        <Outlet />
      </StLayout>
      <Footer>© Corp.</Footer>
    </div>
  );
}

export default Layout;

const Header = styled.header`
  width: "100%";
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
`;

const HeaderRight = styled.section`
  display: flex;
  gap: 0.5rem;
`;

const Search = styled.div``;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
`;

const Footer = styled.footer`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
`;
