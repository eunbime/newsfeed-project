import styled from "styled-components"

/**
 * TODO :
 * user profile을 만든적이 없으면 입력 하라고 뜸, 입력버튼만 보이게 함
 * user profile 수정버튼을 눌러서  내용 수정
 * 이미지 수정 버튼 누르면 이미지 업로드
 */
function Mypage() {
    const tempUser = {
        nickname: "나야",
        name: "김쥐",
        user_id: "email@email.com",

    }
    return (
        <PageBody>
            <Profile>
                <FigureBox>
                    <img src='https://media.bunjang.co.kr/product/233471258_1_1692280086_w360.jpg' />
                    <button>사진 올리기</button>
                </FigureBox>
                <ProfileBox>
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
                </ProfileBox>
            </Profile>

            <MyFeedBox>
                카드 보여주는 부분
            </MyFeedBox>
        </PageBody>
    )
}

const PageBody = styled.body`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Profile = styled.div`
    display: flex;
    width: 800px;
    height: 500px;
    border : 1px solid black;
`
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
const ProfileBox = styled.div`
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
const MyFeedBox = styled.div`
    width: 800px;
    height: 800px;
    border: 1px solid black;

`


export default Mypage