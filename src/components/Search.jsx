import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Search = () => {
  const navigate = useNavigate()
  return (
    <>
      <SearchBox>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>검색</button>
      </SearchBox>
    </>
  )
}

const SearchBox = styled.div``

export default Search
