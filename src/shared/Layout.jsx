import HeaderNav from 'components/HeaderNav'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Layout() {
  const navigate = useNavigate()
  return (
    <LayoutContainer>
      <Header>
        <Title onClick={() => navigate('/')}>Enjoy P</Title>
        <HeaderNav />
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
  width: '100%';
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  cursor: pointer;
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
