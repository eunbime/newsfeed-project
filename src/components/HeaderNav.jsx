import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setLogout } from 'redux/modules/auth'
import { setUser } from 'redux/modules/user'
import styled from 'styled-components'
import { auth } from '../firebase'
import Modal from './Modal'

const profileImg = 'default-profile.jpeg'

const HeaderNav = () => {
  const localuid = localStorage.getItem('useruid')
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const isLogin = useSelector((state) => state.auth.isLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOut = async () => {
    await signOut(auth)
    dispatch(setLogout())
    dispatch(setUser({}))
    localStorage.removeItem('useruid')
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('naviheader: user', user)
        dispatch(setLogin(user.uid))
      }
    })
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [isLogin])

  const logOut = async () => {
    await signOut(auth)
    dispatch(setLogout())
    localStorage.removeItem('useruid')
  }

  const handleToPage = (page) => {
    setMenuOpen(false)
    navigate(`/${page}`)
  }

  return (
    <Container>
      {!isLogin && (
        <NavButton onClick={() => setModalOpen(true)}>로그인</NavButton>
      )}
      {isLogin && (
        <>
          <NavButton onClick={() => handleToPage('write')}>글작성</NavButton>
          {/* 유저 프로필 사진으로 변경 */}
          <ProfileBoxWrapper>
            <ProfileBox onClick={() => setMenuOpen(!menuOpen)}>
              <img src={user.userimg || profileImg} alt="" />
            </ProfileBox>
            {menuOpen && (
              <ProfileMenu>
                <button onClick={() => handleToPage('mypage')}>mypage</button>
                <button onClick={logOut}>로그아웃</button>
              </ProfileMenu>
            )}
          </ProfileBoxWrapper>
        </>
      )}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavButton = styled.button`
  background-color: transparent;
  border: 2px solid var(--mainOrange);
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--mainOrange);
    color: #fff;
  }
`

const ProfileBoxWrapper = styled.div`
  position: relative;
  transition: all 0.5s;
`

const ProfileBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;

  > img {
    width: inherit;
    height: inherit;
  }
`

const ProfileMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: gray;
  width: 7rem;
  margin-top: 0.5rem;
  right: 0;

  button {
    cursor: pointer;
    border: none;
    text-align: start;
    padding: 0.5rem 1rem;
  }
`

export default HeaderNav
