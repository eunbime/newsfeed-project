import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const HeaderNav = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <SearchBox>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>검색</button>
      </SearchBox>
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

const SearchBox = styled.div``

const Container = styled.nav`
  display: flex;
  gap: 0.5rem;
`

export default HeaderNav
