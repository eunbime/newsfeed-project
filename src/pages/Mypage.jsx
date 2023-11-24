import ProfileBox from "components/ProfileBox";
import ProfileFigure from "components/ProfileFigure";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

/**
 * TODO :
 * user profile을 만든적이 없으면 입력 하라고 뜸, 입력버튼만 보이게 함
 * user profile 수정버튼을 눌러서  내용 수정
 * 이미지 수정 버튼 누르면 이미지 업로드
 */
function Mypage() {
  const tempUser = {
    uid: "tSQFARp6PvWNRPswnpYXtSGutYl1",
    //uid: "azaza.hee@gmail.com",
    name: "김쥐",
    email: "email@email.com",
  }
  const [user, setUser] = useState(tempUser);

  useEffect(() => {
    // TODO : 안해도 되는지 확인
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("login user", user.uid);
    //   }
    // });

    const fetchData = async () => {
      const docRef1 = doc(db, "userInfo", tempUser.uid);
      const docSnap1 = await getDoc(docRef1);

      if (docSnap1.exists()) {
        console.log("Document data:", docSnap1.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchData();
  }, []);

  return (
    <PageBody>
      <Profile>
        <ProfileFigure />
        <ProfileBox />
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