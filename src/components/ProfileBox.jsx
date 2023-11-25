import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'redux/config/modules/user'
import styled from 'styled-components'
import { db } from '../firebase'

function ProfileBox({ user }) {
  const dispatch = useDispatch()
  const saveDB = async (testUser) => {
    await setDoc(doc(collection(db, 'userInfo'), testUser.uid), testUser)
  }
  /**
   * 사용자에게 입력받은 value 들을
   * 로그인한 uid의 userInfo db에 저장
   * //TODO1: props로받은 user uid 제대로 가져오는지 확인
   * //TDOD2: 입력받은 값으로 변경
   */
  const onComplete = () => {
    const testUser = {
      uid: user.uid,
      nickname: '쥐',
      name: '김쥐',
      ment: '빨리 끝내자',
      interests: ['스포츠, 맛집'],
    }
    dispatch(setUser(testUser))
    saveDB(testUser)
    setIsEditing(false)
  }
  const onEditProfile = () => {
    setIsEditing(true)
  }

  const [isEditing, setIsEditing] = useState(false)
  return (
    <ProfileContainer>
      <TextBox>
        {!isEditing ? (
          <>
            <p>메일주소 : {user.email} </p>
            <p>닉네임 : {user.nickname} </p>
            <p>이름 : {user.name}</p>
            <p>한마디 : {user.ment} </p>
            {/* TODO : 관심사는 토픽...버튼이나.. 하.. 하지마 */}
          </>
        ) : (
          //한번에 받아서 setUser 어떻게 하는거지
          <>
            <label>메일주소 :</label>
            <input />
            <label>닉네임 :</label>
            <input />
            <label>이름 :</label>
            <input />
            <label>한마디 :</label>
            <input />
          </>
        )}
      </TextBox>
      <ButtonBox>
        {isEditing ? (
          <button onClick={onComplete}>완료</button>
        ) : (
          <button onClick={onEditProfile}>수정</button>
        )}
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
