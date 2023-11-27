import { collection, doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
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
  const [originalUserInfo, setOriginalUserInfo] = useState({})

  // Update state with existing user data when the component mounts
  useEffect(() => {
    setOriginalUserInfo({
      nickname: user.nickname,
      name: user.name,
      ment: user.ment,
    })
  }, [user])

  const saveDB = async (updatedUserInfo) => {
    await setDoc(doc(collection(db, 'userInfo'), localuid), {
      ...updatedUserInfo,
    })
  }

  const onComplete = () => {
    if (nickname.trim() === '' || name.trim() === '' || ment.trim() === '') {
      alert('변경된 내용이 없습니다.')
      return
    }

    const editUserInfo = {
      nickname,
      name,
      ment,
      email: user.email,
      userimg: user.userimg,
    }

    dispatch(setUser(editUserInfo))
    saveDB(editUserInfo)
    setIsEditing(false)
  }

  const onEditProfile = () => {
    setIsEditing(true)
  }

  const onCancelEdit = () => {
    setNickname(originalUserInfo.nickname)
    setName(originalUserInfo.name)
    setMent(originalUserInfo.ment)
    setIsEditing(false)
  }

  return (
    <ProfileContainer>
      <TextBox>
        {!isEditing ? (
          <>
            <p>메일주소: {user.email}</p>
            <p>닉네임: {originalUserInfo.nickname}</p>
            <p>이름: {originalUserInfo.name}</p>
            <p>한마디: {originalUserInfo.ment}</p>
          </>
        ) : (
          <>
            <p>메일주소: {user.email}</p>
            <label>닉네임:</label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <label>이름:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>한마디:</label>
            <input value={ment} onChange={(e) => setMent(e.target.value)} />
          </>
        )}
      </TextBox>
      <ButtonBox>
        {isEditing ? (
          <>
            <button onClick={onComplete}>완료</button>
            <button onClick={onCancelEdit}>취소</button>
          </>
        ) : (
          <button onClick={onEditProfile}>수정</button>
        )}
      </ButtonBox>
    </ProfileContainer>
  )
}

export default ProfileBox

const ProfileContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 300px;
  margin-left: 30px;
  background-color: #ffe7cf;

  border-radius: 20px;
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 250px;
  padding: 50px 50px 0px;
  & p {
    background-color: #fff5e6;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-top: auto;
  padding-bottom: 10px;
  & button {
    background-color: var(--mainOrange);
    border: 2px solid var(--mainOrange);
    padding: 0.3rem 1rem;
    margin-right: 0.5rem;
    border-radius: 1rem;
    text-align: center;
    font-size: medium;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-top: 1rem;

    &:hover {
      background-color: transparent;
    }
  }
`
