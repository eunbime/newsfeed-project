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
          <Title
            onClick={() => {
              window.location.replace('/')
            }}
          >
            <ImageEp src={enjoyP} alt="Enjoy P" />
          </Title>
          <HeaderNav />
        </HeaderWrapper>
      </Header>
      <StLayout>
        <Outlet />
      </StLayout>

      <Footer>
        <a href="https://github.com/eunbime/newsfeed-project">
          <img src="github-icon.png" alt="github" width="30px" />
        </a>
      </Footer>
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
  background: #fff;
  width: '100%';
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
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
