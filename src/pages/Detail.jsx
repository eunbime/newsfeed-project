import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageContainer = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`
const Title = styled.h2`
  color: #333;
`
const AdditionalBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`
const Detail = () => {
  return (
    <PageContainer>
      <Box>
        <Title>제목</Title>
        <p>이곳은 상세 페이지입니다.</p>
        <Link to="/">홈으로 이동</Link>
      </Box>
      <AdditionalBox>
        <p>작성자: 김은뷔</p>
        <p>작성날짜: 2023-11-21</p>
        <p>선택한 토픽: 게임</p>
        <label>선택한 토픽:</label>
        <select>
          <option value="game">게임</option>
          <option value="sports">스포츠</option>
          <option value="restaurant">맛집</option>
        </select>
      </AdditionalBox>
    </PageContainer>
  )
}
export default Detail
