import styled from "styled-components"

function ProfileFigure() {
  return (
    <>
      <FigureBox>
        <img src='https://media.bunjang.co.kr/product/233471258_1_1692280086_w360.jpg' />
        <button>사진 올리기</button>
      </FigureBox>
    </>
  )
}

export default ProfileFigure

const FigureBox = styled.figure`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
    border : 1px solid black;
    & img {
        width: 100%;
    }
    & button {
        margin : 10px 0;
    }
`