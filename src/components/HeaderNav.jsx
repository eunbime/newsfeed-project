import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Search from './Search'

const HeaderNav = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Search />
      <button
        onClick={() => {
          navigate('/write')
        }}
      >
        글작성
      </button>
      <button>로그인</button>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  gap: 0.5rem;
`

export default HeaderNav
