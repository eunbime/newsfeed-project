import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'redux/modules/user'
import styled from 'styled-components'
import { db } from '../firebase'

function ProfileBox({ user }) {
  const localuid = localStorage.getItem('useruid')
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [ment, setMent] = useState('')

  const saveDB = async (testUser) => {
    await setDoc(doc(collection(db, 'userInfo'), localuid), { ...testUser })
  }
  /**
   * 사용자에게 입력받은 value 들을
   * 로그인한 uid의 userInfo db에 저장, redux에 저장
   */
  const onComplete = () => {
    const editUserInfo = {
      nickname,
      name,
      ment,
    }
    console.log('수정완료onComplete', editUserInfo)
    dispatch(setUser(editUserInfo))
    saveDB(editUserInfo)
    setIsEditing(false)
  }
  const onEditProfile = () => {
    setIsEditing(true)
  }

  return (
    <ProfileContainer>
      <TextBox>
        {!isEditing ? (
          <>
            <p>메일주소 : {user.email} </p>
            <p>닉네임 : {user.nickname} </p>
            <p>이름 : {user.name}</p>
            <p>한마디 : {user.ment} </p>
          </>
        ) : (
          <>
            <p>메일주소 : {user.email} </p>
            <label>닉네임 :</label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <label>이름 :</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>한마디 :</label>
            <input value={ment} onChange={(e) => setMent(e.target.value)} />
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
