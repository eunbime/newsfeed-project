import styled from "styled-components"

function ProfileBox() {
  return (
    <ProfileContainer>
      <TextBox>
        <p>메일주소 : </p>
        <p>닉네임 : </p>
        <p>이름 : </p>
        <p>한마디 : </p>
      </TextBox>
      <ButtonBox>
        <button>수정</button>
        <button>완료</button>
      </ButtonBox>
    </ProfileContainer>
  )
}

export default ProfileBox

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 500px;
    border: 1px solid black;
`
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 500px;
    padding: 50px;
    border: 1px solid black;
`
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: auto;
    border: 1px solid black;
    & button {
        height: 40px;
        width: 80px;
    }
`