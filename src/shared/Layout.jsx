import HeaderNav from 'components/HeaderNav'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import enjoyP from '../assets/Enjoy P.png'

function Layout() {
  const navigate = useNavigate()
  return (
    <LayoutContainer>
      <Header>
        <HeaderWrapper>
          <Title onClick={() => navigate('/')}>
            <ImageEp src={enjoyP} alt="Enjoy P" />
          </Title>
          <HeaderNav />
        </HeaderWrapper>
      </Header>
      <StLayout>
        <Outlet />
      </StLayout>

      <Footer>© Corp.</Footer>
    </LayoutContainer>
  )
}

export default Layout

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* min-width: 600px; */
`

const Header = styled.header`
  background: linear-gradient(
    to right,
    #ff0000,
    /* Red */ #ff7f00,
    /* Orange */ #ffff00,
    /* Yellow */ #00ff00,
    /* Green */ #0000ff,
    /* Blue */ #4b0082,
    /* Indigo */ #9400d3 /* Violet */
  );
  width: '100%';
  height: 7rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px #eee;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1250px;
  margin: 0 auto;
`

const Title = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`

const ImageEp = styled.img`
  height: auto;
  margin: 0 10px;
`

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
`

const Footer = styled.footer`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
`
