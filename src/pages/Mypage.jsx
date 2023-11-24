import ProfileBox from "components/ProfileBox";
import ProfileFigure from "components/ProfileFigure";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";

/**
 * TODO :
 * 마이페이지에 들어오면 현재 로그인한 유저의 uid(redux)로 db로 부터 유저정보를 가져온다
 * user profile을 만든적이 없으면 입력 하라고 뜸, 입력버튼만 보이게 함
 * user profile 수정버튼을 눌러서  내용 수정
 * 이미지 수정 버튼 누르면 이미지 업로드
 */
function Mypage() {
  const loginUserUid = useSelector(state => state.auth.loginUserUid);

  console.log("loginuseruid", loginUserUid);
  const tempUser = {
    nickname: "닉네임",
    name: "Anonymous",
    email: "email@email.com",
    ment: "유저 한마디",
    interest: ["관심사"],
  }
  const [user, setUser] = useState(tempUser);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "userInfo", loginUserUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        alert("user 정보를 가져오지 못했습니다.")
      }
    };
    fetchData();
  }, []);

  return (
    <PageBody>
      <Profile>
        <ProfileFigure />
        <ProfileBox user={user} />
      </Profile>
      <MyFeedBox>
        카드 보여주는 부분
      </MyFeedBox>
    </PageBody>
  )
}

const PageBody = styled.div`
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
const MyFeedBox = styled.div`
    width: 800px;
    height: 800px;
    border: 1px solid black;

`


export default Mypage