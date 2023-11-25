import styled from "styled-components";

//TODO:파일업로드 postform의 파일업로드 컴포넌트로 빼서 재사용
// user redux에 URL 저장해줘야함
function ProfileFigure({ userImg }) {
  return (
    <>
      <FigureBox>
        <img src={userImg} />
        <button>사진 올리기</button>
        {/* <input type="file" onChange={handleFileSelect} /> */}
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