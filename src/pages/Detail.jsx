
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #333;
`;

const AdditionalBox = styled.div`
  background-color: #ffffff; 
  padding: 20px;
  border-radius: 8px; 
  margin-top: 20px;
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 
  margin: 20px;
`;

const AdditionalInfo = styled.div`
 
`;
const ContentBox = styled.div`
  background-color: #ffffff; 
  padding: 30px;
  border-radius: 8px; 
  margin-top: 20px;
`;
 
const Detail = () => {
  // const Content = "홈에서 가져온 데이터";
  return (
    <PageContainer>
      <Box>
        <Title>제목</Title>
      </Box>
      <AdditionalBox>
        <AdditionalInfo>
          <p>작성자: 나</p>
          <p>작성날짜: 2023-11-21</p>
          <label>선택한 토픽:</label>
        </AdditionalInfo>
      </AdditionalBox>
      <ContentBox>
      {/* <h2>내용{Content}</h2> */}
    </ContentBox>
    </PageContainer>
  );
};


export default Detail;
